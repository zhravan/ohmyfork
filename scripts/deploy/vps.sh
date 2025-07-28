#!/bin/bash

# Simple logging functions
info()   { echo "[INFO] $*"; }
warn()   { echo "[WARN] $*" >&2; }
debug()  { [ "$DEBUG" = "1" ] && echo "[DEBUG] $*"; }

# Enable debug logs by setting DEBUG=1
DEBUG=0

# Variables
APP_DIR="/var/www/ohmyfork"
REPO_URL="https://github.com/shravan20/ohmyfork.git"
DOMAIN="ohmyfork.dev"
CADDYFILE="/etc/caddy/Caddyfile"
BUILD_DIR="$APP_DIR/dist"

info "Starting deployment..."

# Check for root
if [ "$(id -u)" -ne 0 ]; then
  warn "This script must be run as root."
  exit 1
fi

# Install Caddy if not present
if ! command -v caddy >/dev/null 2>&1; then
  info "Installing Caddy..."
  apt update && apt install -y debian-keyring debian-archive-keyring apt-transport-https curl gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | \
    sed 's#^deb #deb [signed-by=/usr/share/keyrings/caddy-archive-keyring.gpg] #' | \
    tee /etc/apt/sources.list.d/caddy-stable.list
  apt update && apt install -y caddy
else
  debug "Caddy is already installed."
fi

# Clone or update app
if [ ! -d "$APP_DIR" ]; then
  info "Cloning repository..."
  git clone "$REPO_URL" "$APP_DIR"
else
  info "Pulling latest changes..."
  cd "$APP_DIR" && git pull
fi

# Build app
cd "$APP_DIR"
info "Installing dependencies..."
npm install

info "Building production site..."
if ! npm run build:prod; then
  warn "Build failed."
  exit 1
fi

# Update Caddyfile
info "Writing Caddyfile..."
cat > "$CADDYFILE" <<EOF
$DOMAIN, www.$DOMAIN {
  root * $BUILD_DIR
  try_files {path} /index.html
  file_server
  encode gzip
  log {
    output file /var/log/caddy/ohmyfork.dev.log
  }
}
EOF

# Reload Caddy
info "Reloading Caddy..."
if ! caddy reload --config "$CADDYFILE" --adapter caddyfile; then
  warn "Caddy reload failed. Check syntax or permissions."
  exit 1
fi

info "Deployment complete. Visit https://$DOMAIN"
