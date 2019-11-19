const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');
if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
  require.extensions['.css'] = (file) => {};
  require.extensions['.png'] = () => {};
}
const nextConfig = {
  exportPathMap: function() {
    return {
      '/': { page: '/' },
    };
  },
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    LINKEDIN_API_KEY: process.env.LINKEDIN_API_KEY,
    LINKEDIN_SECRET_KEY: process.env.LINKEDIN_SECRET_KEY,
    LINKEDIN_CALLBACK_URL: process.env.LINKEDIN_CALLBACK_URL,
  },
};

module.exports = withPlugins([withSass, withImages, withCSS], nextConfig);
