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
        /node_modules([\\]+|\/)+(?!(@keg-hub|@ltipton))/,
        /\@ltipton([\\]+|\/)node_modules/,
        /\@keg-hub\/.*([\\]+|\/)node_modules/,
      ]
    }

    // for hot reloading node_modules/@keg-hub/** */
    config.contentBase = [
      config.contentBase,
      path.join(__dirname, 'node_modules', '@keg-hub'),
      path.join(__dirname, 'node_modules', '@ltipton')
    ]

    return config
  }
}


const overrideWebpack = (config, env) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        react: path.join(__dirname, `node_modules/react`),
        '@ltipton/rga4': path.join(__dirname, `node_modules/@ltipton/rga4/build/rga4.esm.js`),
      },
    }
  }
}

module.exports = {
  webpack: overrideWebpack,
  devServer: overrideDevServer
}