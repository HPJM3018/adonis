const path = require('path');
const { merge } = require('webpack-merge');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// Configuration de base de Webpack
const baseConfig = {
  entry: './resources/js/app.ts',  // Point d'entrée pour ton JavaScript/TypeScript
  output: {
    path: path.resolve(__dirname, 'public/js'),  // Dossier de sortie pour les fichiers JS compilés
    filename: 'bundle.js',  // Nom du fichier JS compilé
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',  // Utilisation de la configuration TypeScript
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',  // Chargeur pour TypeScript
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],  // Chargeurs pour CSS avec PostCSS et Tailwind
      },
    ],
  },
  plugins: [],
};

// Configuration pour le mode développement
const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    hot: true,  // Rechargement à chaud pour le dev
    port: 3000,
  },
};

// Configuration pour le mode production
const prodConfig = {
  mode: 'production',
};

// Exporter la configuration finale, selon le mode
module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    return merge(baseConfig, prodConfig);
  }
  return merge(baseConfig, devConfig);
};
