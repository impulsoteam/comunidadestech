const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
if (typeof require !== 'undefined') {
  /* eslint-disable node/no-deprecated-api */
  require.extensions['.less'] = () => {}
  require.extensions['.sass'] = () => {}
  require.extensions['.css'] = () => {}
  require.extensions['.png'] = () => {}
  /* eslint-disable node/no-deprecated-api */
}
const nextConfig = {
  exportPathMap: function () {
    return {
      '/': { page: '/' }
    }
  },
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    LINKEDIN_API_KEY: process.env.LINKEDIN_API_KEY,
    LINKEDIN_SECRET_KEY: process.env.LINKEDIN_SECRET_KEY,
    LINKEDIN_CALLBACK_URL: process.env.LINKEDIN_CALLBACK_URL,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    DEFAULT_LOGO: process.env.DEFAULT_LOGO
  }
}

module.exports = withPlugins([withSass, withImages, withCSS], nextConfig)
