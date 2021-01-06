

require('dotenv').config()  

module.exports = {
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}
