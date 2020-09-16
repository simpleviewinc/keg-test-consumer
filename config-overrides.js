/* config-overrides.js */

const path = require('path')

/**
 * React-app-rewired config for webpack dev server, enabling us to override and extend the create react app webpack config
 * @param {Object} config 
 * @param {String} env 
 */
const overrideDevServer = (reactConfigFunction) => {
  return (proxy, allowedHost) => {
    const config = reactConfigFunction(proxy, allowedHost)

    // for recompiling node_modules/@keg-hub/** */
    config.watchOptions = {
      ...config.watchOptions,
      aggregateTimeout: 200,
      poll: process.env.KEG_CONSUMER_BUILD_PATH ? 1000 : false,
      ignored: [
        /node_modules([\\]+|\/)+(?!@keg-hub)/, 
      ]
    }

    // for hot reloading node_modules/@keg-hub/** */
    config.contentBase = [
      config.contentBase,
      path.join(__dirname, 'node_modules', '@keg-hub')
    ]

    return config
  }
}

module.exports = {
  devServer: overrideDevServer
}