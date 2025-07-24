/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const indexPath = path.join(distDir, 'index.html');

if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');
  // Replace all asset paths to be relative for GitHub Pages
  html = html.replace(/\/(assets|ohmyfork)/g, '/ohmyfork/$1');
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('Patched index.html for GitHub Pages base path.');
} else {
  console.warn('index.html not found in dist. Skipping patch.');
}
