import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies || {});

let banner =
  '/*!\n' +
  ' * ' + pkg.name + '.js v' + pkg.version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' ' + pkg.author + '\n' +
  ' * Released under the MIT License.\n' +
	' * ' + pkg.homepage + '\n' +
  ' */\n';

export default {
  entry: './src/index.js',
  banner: banner,
  plugins: [
    babel(babelrc())
  ],
  external: external,
  targets: [
    {
      dest: pkg['main'],
      format: 'umd',
      moduleName: 'workplusCodash',
      sourceMap: true
    },
    {
      dest: pkg['jsnext:main'],
      format: 'es',
      sourceMap: true
    }
  ]
};