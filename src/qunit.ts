const escape = require('js-string-escape');

import TestGenerator from './test-generator';

export default class QUnitTestGenerator implements TestGenerator {
  suiteHeader(suiteName: string) {
    return `QUnit.module('${escape(suiteName)}');\n`;
  }

  suiteFooter() {
    return '';
  }

  test(testName: string, passed: boolean, assertionMessage: string) {
    return (
      `QUnit.test('${escape(testName)}', function(assert) {\n` +
      `  assert.expect(1);\n` +
      `  assert.ok(${passed}, '${escape(assertionMessage)}');\n` +
      `});\n`
    );
  }
}
