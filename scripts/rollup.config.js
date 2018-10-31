import path from 'path';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import createBanner from './banner';

const pkg = require('../package.json');
const banner = createBanner(pkg);
const external = Object.keys(pkg.dependencies || {});

export default {
  input: path.resolve(__dirname, '../src/index.js'),
  external,
  output: [
    {
      file: pkg['main'],
      format: 'umd',
      name: 'workplusCodash',
      globals: {
        invariant: 'invariant',
      }, 
      banner,
    },
    {
      file: pkg['jsnext:main'],
      format: 'es',
      globals: ['invariant'], 
      banner,
    }
  ],
  plugins: [
    babel(babelrc())
  ],
};