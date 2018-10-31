export default function createBanner(pkg) {
  const banner =
    '/*!\n' +
    ' * ' + pkg.name + '.js v' + pkg.version + '\n' +
    ' * (c) ' + new Date().getFullYear() + ' ' + pkg.author + '\n' +
    ' * Released under the MIT License.\n' +
    ' * ' + pkg.homepage + '\n' +
    ' */\n';

  return banner;
};