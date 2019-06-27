const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');

const nextConfig = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  },
  exportPathMap: function() {
    return {
      '/': { page: '/' },
    };
  },
};

module.exports = withPlugins([withSass, withImages], nextConfig);
