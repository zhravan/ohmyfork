#!/bin/bash

# Logging helpers
info()  { echo "[INFO] $*"; }
warn()  { echo "[WARN] $*" >&2; }
debug() { [ "$DEBUG" = "1" ] && echo "[DEBUG] $*"; }

DEBUG=0
APP_DIR="/var/www/ohmyfork"
FINAL_DIST="$APP_DIR/dist"
DOMAIN="ohmyfork.dev"
CADDYFILE="/etc/caddy/Caddyfile"

info "Starting ohmyfork.dev deployment..."

# Must be root
if [ "$(id -u)" -ne 0 ]; then
  warn "Run this script as root."
  exit 1
fi

# Install Caddy if needed
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

# Clone or update code
if [ ! -d "$APP_DIR" ]; then
  info "Cloning ohmyfork repo..."
  git clone https://github.com/shravan20/ohmyfork.git "$APP_DIR"
else
  info "Pulling latest changes..."
  cd "$APP_DIR" && git pull
fi

# Build
cd "$APP_DIR"
info "Installing and building..."
if ! npm install || ! npm run build:prod; then
  warn "Build failed!"
  exit 1
fi

# Backup Caddyfile
cp "$CADDYFILE" "$CADDYFILE.bak.$(date +%s)"

# Write Caddyfile
info "Writing Caddyfile..."
cat > "$CADDYFILE" <<EOF
$DOMAIN, www.$DOMAIN {
  root * $FINAL_DIST
  file_server
  encode gzip
  log {
    output file /var/log/caddy/ohmyfork.dev.log
  }
}
EOF

# Reload Caddy
info "Reloading Caddy..."
caddy reload --config "$CADDYFILE" --adapter caddyfile || {
  warn "Caddy reload failed!"
  exit 1
}

info "Deployment complete. Visit: https://$DOMAIN"
