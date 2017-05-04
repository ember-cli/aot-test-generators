const escape = require('js-string-escape');

export default function(str: string): string {
  return `'${escape(str)}'`;
};
