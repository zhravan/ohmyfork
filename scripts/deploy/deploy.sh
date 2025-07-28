#!/bin/sh

# Simple logging functions
info()   { echo "[INFO] $*"; }
warn()   { echo "[WARN] $*" >&2; }
debug()  { [ "$DEBUG" = "1" ] && echo "[DEBUG] $*"; }

# Set DEBUG=1 to enable debug logs
DEBUG=0

# Variables
APP_DIR="/var/www/ohmyfork"
DOMAIN="ohmyfork.dev"
CADDYFILE="/etc/caddy/Caddyfile"

info "Starting deployment..."

# Check for root
if [ "$(id -u)" -ne 0 ]; then
  warn "This script must be run as root."
  exit 1
fi

# Install Caddy if not present
if ! command -v caddy >/dev/null 2>&1; then
  info "Installing Caddy..."
  apt update && apt install -y debian-keyring debian-archive-keyring apt-transport-https
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | apt-key add -
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
  apt update && apt install -y caddy
else
  debug "Caddy already installed."
fi

# Clone or update app
if [ ! -d "$APP_DIR" ]; then
  info "Cloning repository..."
  git clone https://github.com/shravan20/ohmyfork.git "$APP_DIR"
else
  info "Updating repository..."
  cd "$APP_DIR" && git pull
fi

# Build app (adjust as needed)
cd "$APP_DIR"
info "Installing dependencies and building app..."
npm install && npm run build:prod

# Configure Caddy
info "Configuring Caddy..."
cat > "$CADDYFILE" <<EOF
$DOMAIN {
  root * $APP_DIR/dist
  file_server
  encode gzip
}
EOF

# Restart Caddy
info "Restarting Caddy..."
systemctl reload caddy

info "Deployment complete. Visit https://$DOMAIN"
