#!/usr/bin/env node

/**
 * Asset Generator for Deepfake Detector Mobile
 * Run: node generate-assets.js
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

console.log(`${colors.cyan}
╔══════════════════════════════════════════════════╗
║   🎨 Deepfake Detector - Asset Generator        ║
╚══════════════════════════════════════════════════╝
${colors.reset}\n`);

const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

function generateSVGIcon(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8B5CF6"/>
      <stop offset="100%" style="stop-color:#7C3AED"/>
    </linearGradient>
    <linearGradient id="shield" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#A78BFA"/>
      <stop offset="100%" style="stop-color:#8B5CF6"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#bg)" rx="${size*0.15}"/>
  <path d="M ${size/2} ${size*0.25} L ${size*0.35} ${size*0.35} L ${size*0.35} ${size*0.65} Q ${size*0.35} ${size*0.75} ${size/2} ${size*0.8} Q ${size*0.65} ${size*0.75} ${size*0.65} ${size*0.65} L ${size*0.65} ${size*0.35} Z" fill="url(#shield)" stroke="white" stroke-width="${size*0.015}"/>
  <path d="M ${size*0.42} ${size*0.52} L ${size*0.47} ${size*0.58} L ${size*0.58} ${size*0.45}" fill="none" stroke="white" stroke-width="${size*0.025}" stroke-linecap="round"/>
  <circle cx="${size*0.72}" cy="${size*0.35}" r="${size*0.015}" fill="white" opacity="0.8"/>
  <circle cx="${size*0.28}" cy="${size*0.38}" r="${size*0.012}" fill="white" opacity="0.6"/>
</svg>`;
}

function generateSplashSVG(width, height) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#7C3AED"/>
      <stop offset="50%" style="stop-color:#8B5CF6"/>
      <stop offset="100%" style="stop-color:#A78BFA"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad)"/>
  <circle cx="${width*0.1}" cy="${height*0.2}" r="${width*0.05}" fill="white" opacity="0.1"/>
  <circle cx="${width*0.9}" cy="${height*0.7}" r="${width*0.08}" fill="white" opacity="0.08"/>
  <g transform="translate(${width/2}, ${height/2.2})">
    <path d="M 0 -${height*0.15} L -${width*0.12} -${height*0.1} L -${width*0.12} ${height*0.05} Q -${width*0.12} ${height*0.12} 0 ${height*0.15} Q ${width*0.12} ${height*0.12} ${width*0.12} ${height*0.05} L ${width*0.12} -${height*0.1} Z" fill="white" opacity="0.95" stroke="white" stroke-width="${width*0.003}"/>
    <path d="M -${width*0.04} ${height*0.01} L -${width*0.01} ${height*0.05} L ${width*0.06} -${height*0.03}" fill="none" stroke="#8B5CF6" stroke-width="${width*0.008}" stroke-linecap="round"/>
  </g>
  <text x="${width/2}" y="${height*0.65}" font-family="system-ui" font-size="${width*0.055}" font-weight="bold" fill="white" text-anchor="middle">Deepfake Detector</text>
  <text x="${width/2}" y="${height*0.70}" font-family="system-ui" font-size="${width*0.03}" fill="white" opacity="0.8" text-anchor="middle">AI-Powered Video Verification</text>
</svg>`;
}

function saveSVG(content, filepath) {
  fs.writeFileSync(filepath, content);
  console.log(`${colors.green}✓${colors.reset} ${path.basename(filepath)}`);
}

async function generateAssets() {
  try {
    const sharp = require('sharp');
    console.log(`${colors.cyan}Using Sharp for PNG generation${colors.reset}\n`);
    
    await sharp(Buffer.from(generateSVGIcon(1024))).resize(1024, 1024).png().toFile(path.join(assetsDir, 'icon.png'));
    console.log(`${colors.green}✓${colors.reset} icon.png`);
    
    await sharp(Buffer.from(generateSVGIcon(1024))).resize(1024, 1024).png().toFile(path.join(assetsDir, 'adaptive-icon.png'));
    console.log(`${colors.green}✓${colors.reset} adaptive-icon.png`);
    
    await sharp(Buffer.from(generateSVGIcon(48))).resize(48, 48).png().toFile(path.join(assetsDir, 'favicon.png'));
    console.log(`${colors.green}✓${colors.reset} favicon.png`);
    
    await sharp(Buffer.from(generateSplashSVG(1242, 2436))).resize(1242, 2436).png().toFile(path.join(assetsDir, 'splash.png'));
    console.log(`${colors.green}✓${colors.reset} splash.png`);
  } catch (error) {
    console.log(`${colors.yellow}Sharp not found. Generating SVG files${colors.reset}\n`);
    saveSVG(generateSVGIcon(1024), path.join(assetsDir, 'icon.svg'));
    saveSVG(generateSVGIcon(1024), path.join(assetsDir, 'adaptive-icon.svg'));
    saveSVG(generateSVGIcon(48), path.join(assetsDir, 'favicon.svg'));
    saveSVG(generateSplashSVG(1242, 2436), path.join(assetsDir, 'splash.svg'));
    console.log(`\n${colors.yellow}Convert SVG to PNG: npm install sharp --save-dev${colors.reset}\n`);
  }
  
  const modelDir = path.join(assetsDir, 'model');
  if (!fs.existsSync(modelDir)) {
    fs.mkdirSync(modelDir, { recursive: true });
    fs.writeFileSync(path.join(modelDir, '.gitkeep'), '');
  }
  
  console.log(`\n${colors.green}✨ Done! Run: npm start${colors.reset}\n`);
}

generateAssets().catch(err => console.error('Error:', err.message));
