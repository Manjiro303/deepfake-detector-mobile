const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for TensorFlow.js
config.resolver.assetExts.push('bin');
config.resolver.assetExts.push('txt');
config.resolver.assetExts.push('jpg');

module.exports = config;
