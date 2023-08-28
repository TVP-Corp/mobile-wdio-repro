const presets = [
  'module:metro-react-native-babel-preset',
  [
    '@babel/preset-env',
    {
      targets: {
        node: 16,
      },
    },
  ],
];

const plugins = [
  'macros',
  '@babel/plugin-transform-runtime',
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ['./src/'],
      alias: {
        '': './src',
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.ios.js', '.android.js'],
    },
  ],
  ['@babel/plugin-proposal-private-methods', { loose: true }],
  ['@babel/plugin-transform-private-property-in-object', { loose: true }],
  ['@babel/plugin-transform-class-properties', { loose: true }],
];

module.exports = {
  presets,
  plugins,
};
