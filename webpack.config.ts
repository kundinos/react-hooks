import path from 'path';
import { Configuration } from 'webpack';
import TerserJSPlugin from 'terser-webpack-plugin';

function getConfig({ mode, libraryTarget }): Configuration {
  return {
    mode,
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, `./dist/${libraryTarget}`),
      filename: `kundinos-react-hooks.${mode}.js`,
      libraryTarget,
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          include: [path.resolve(__dirname, './src')],
          exclude: '/node_modules/',
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                presets: [
                  [
                    '@babel/preset-typescript',
                    {
                      isTSX: true,
                      allExtensions: true,
                    },
                  ],
                  '@babel/preset-react',
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns: 'entry',
                      corejs: 3,
                      modules: 'umd',
                    },
                  ],
                ],
                plugins: ['@babel/plugin-transform-runtime'],
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: mode === 'production',
      minimizer: [new TerserJSPlugin()],
    },
    externals: [
      /^@babel\/runtime/,
      {
        react: {
          commonjs: 'react',
          commonjs2: 'react',
          umd: 'react',
        },
      },
    ],
  };
}

export default [
  getConfig({ mode: 'development', libraryTarget: 'commonjs' }),
  getConfig({ mode: 'development', libraryTarget: 'umd' }),
  getConfig({ mode: 'production', libraryTarget: 'commonjs' }),
  getConfig({ mode: 'production', libraryTarget: 'umd' }),
];
