const path = require('path');
const rollup = require('rollup');
const entry = require('./entry');

async function build(inputOptions, outputOptions) {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // generate code and a sourcemap
  const { code, map } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

// build core cordova
build({
  input: path.resolve(__dirname, '../src/core/cordova.js'),
  external: ['invariant'],
}, {
  format: 'umd',
  name: `workplusCordova`,
  file: path.resolve(__dirname, `../lib/cordova.js`),
  globals: {
    invariant: 'invariant',
  },
});

// build common function
const keys = Object.keys(entry);
(async() => {
  for (let i = 0; i < keys.length; i += 1) {
    const inputOptions = {
      input: entry[keys[i]],
    };
    const outputOptions = {
      format: 'umd',
      name: `workplus${keys[i]}`,
      file: path.resolve(__dirname, `../lib/${keys[i]}.js`),
    };
    await build(inputOptions, outputOptions);
  }
})();
