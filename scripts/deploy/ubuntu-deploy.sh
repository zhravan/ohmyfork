#!/bin/bash

# Ubuntu Server Deployment Script for ohmyfork
# This script pulls latest code, builds the project, and deploys to /var/www/ohmyfork with Caddy

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/opt/ohmyfork"
WEB_ROOT="/var/www/ohmyfork"
REPO_URL="https://github.com/shravan20/ohmyfork.git"
DOMAIN="your-domain.com"  # Change this to your actual domain
NODE_VERSION="20"

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   error "This script must be run as root (use sudo)"
fi

log "Starting deployment process..."

# Update system packages
log "Updating system packages..."
apt update && apt upgrade -y

# Install essential tools
log "Installing essential tools..."
apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Install Node.js
log "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    log "Installing Node.js ${NODE_VERSION}..."
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
    apt install -y nodejs
else
    NODE_CURRENT=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [[ $NODE_CURRENT -lt $NODE_VERSION ]]; then
        warn "Node.js version $NODE_CURRENT is older than required $NODE_VERSION. Updating..."
        curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
        apt install -y nodejs
    else
        success "Node.js $(node --version) is already installed"
    fi
fi

# Install npm if not present
if ! command -v npm &> /dev/null; then
    log "Installing npm..."
    apt install -y npm
fi

# Install Caddy
log "Checking Caddy installation..."
if ! command -v caddy &> /dev/null; then
    log "Installing Caddy..."
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
    apt update
    apt install -y caddy
else
    success "Caddy $(caddy version) is already installed"
fi

# Create project directory
log "Setting up project directory..."
mkdir -p "$PROJECT_DIR"
mkdir -p "$WEB_ROOT"

# Clone or update repository
if [[ -d "$PROJECT_DIR/.git" ]]; then
    log "Updating existing repository..."
    cd "$PROJECT_DIR"
    git fetch origin
    git reset --hard origin/main  # Force update to latest
    git clean -fd  # Remove untracked files
else
    log "Cloning repository..."
    rm -rf "$PROJECT_DIR"  # Remove if exists but not a git repo
    git clone "$REPO_URL" "$PROJECT_DIR"
    cd "$PROJECT_DIR"
fi

# Install dependencies
log "Installing project dependencies..."
npm ci --production=false

# Build the project
log "Building the project..."
npm run build

# Copy built files to web root
log "Deploying built files to $WEB_ROOT..."
rsync -av --delete "$PROJECT_DIR/dist/" "$WEB_ROOT/"

# Set proper permissions
log "Setting file permissions..."
chown -R www-data:www-data "$WEB_ROOT"
chmod -R 755 "$WEB_ROOT"

# Create Caddy configuration
log "Configuring Caddy..."
cat > /etc/caddy/Caddyfile << EOF
# Caddyfile for ohmyfork

$DOMAIN {
    root * $WEB_ROOT
    file_server
    
    # Handle SPA routing - serve index.html for all routes
    try_files {path} /index.html
    
    # Security headers
    header {
        # Enable HSTS
        Strict-Transport-Security max-age=31536000;
        # Prevent MIME sniffing
        X-Content-Type-Options nosniff
        # Prevent clickjacking
        X-Frame-Options DENY
        # XSS protection
        X-XSS-Protection "1; mode=block"
        # Referrer policy
        Referrer-Policy strict-origin-when-cross-origin
    }
    
    # Gzip compression
    encode gzip
    
    # Cache static assets
    @static {
        path *.css *.js *.png *.jpg *.jpeg *.gif *.ico *.svg *.woff *.woff2 *.ttf *.eot
    }
    header @static Cache-Control max-age=31536000
    
    # Logging
    log {
        output file /var/log/caddy/ohmyfork.log {
            roll_size 10mb
            roll_keep 5
        }
    }
}

# HTTP redirect to HTTPS
http://$DOMAIN {
    redir https://{host}{uri} permanent
}
EOF

# Create log directory
mkdir -p /var/log/caddy
chown caddy:caddy /var/log/caddy

# Test Caddy configuration
log "Testing Caddy configuration..."
if caddy validate --config /etc/caddy/Caddyfile; then
    success "Caddy configuration is valid"
else
    error "Caddy configuration is invalid"
fi

# Enable and start Caddy service
log "Starting Caddy service..."
systemctl enable caddy
systemctl restart caddy

# Check service status
if systemctl is-active --quiet caddy; then
    success "Caddy service is running"
else
    error "Failed to start Caddy service"
fi

# Setup firewall (if ufw is available)
if command -v ufw &> /dev/null; then
    log "Configuring firewall..."
    ufw allow 22/tcp    # SSH
    ufw allow 80/tcp    # HTTP
    ufw allow 443/tcp   # HTTPS
    ufw --force enable
    success "Firewall configured"
fi

# Create deployment info file
cat > "$WEB_ROOT/deployment-info.txt" << EOF
Deployment Information
=====================
Deployed: $(date)
Commit: $(cd "$PROJECT_DIR" && git rev-parse HEAD)
Branch: $(cd "$PROJECT_DIR" && git branch --show-current)
Node.js: $(node --version)
npm: $(npm --version)
Caddy: $(caddy version)
EOF

# Display deployment summary
echo
echo "======================================"
success "Deployment completed successfully!"
echo "======================================"
echo
log "Project deployed to: $WEB_ROOT"
log "Caddy config: /etc/caddy/Caddyfile"
log "Logs: /var/log/caddy/ohmyfork.log"
log "Domain: $DOMAIN"
echo
warn "IMPORTANT: Update the DOMAIN variable in this script to your actual domain!"
warn "Current domain is set to: $DOMAIN"
echo
log "Useful commands:"
echo "  - View Caddy status: systemctl status caddy"
echo "  - View Caddy logs: journalctl -u caddy -f"
echo "  - Reload Caddy config: systemctl reload caddy"
echo "  - Re-run deployment: sudo bash $0"
echo
success "Your site should now be available at https://$DOMAIN"
