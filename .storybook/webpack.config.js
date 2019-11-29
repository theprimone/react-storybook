module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: 'ts-loader',
  });

  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules.push({
    loader: 'babel-loader',
    exclude: /node_modules/,
    test: /\.(js|jsx)$/,
    options: {
      presets: ['@babel/react'],
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ['@babel/plugin-proposal-class-properties'],
      ]
    },
  });

  config.module.rules.push({
    test: /\.(css|less)$/,
    include: /node_modules/,
    use: [{
      loader: 'style-loader' // creates style nodes from JS strings
    }, {
      loader: 'css-loader', // translates CSS into CommonJS
    }, {
      loader: 'less-loader', // compiles Less to CSS
      options: { javascriptEnabled: true, sourceMap: true },
    }],
  })

  config.module.rules.push({
    test: /\.(css|less)$/,
    exclude: /node_modules/,
    use: [{
      loader: 'style-loader' // creates style nodes from JS strings
    }, {
      loader: 'css-loader', // translates CSS into CommonJS
      options: {
        modules: {
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
        },
      }
    }, {
      loader: 'less-loader', // compiles Less to CSS
      options: { javascriptEnabled: true, sourceMap: true },
    }],
  });

  return config;
};
