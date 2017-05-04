const escape = require('js-string-escape');

export interface TestGenerator {
  suiteHeader(suiteName: string): string
  suiteFooter(): string
  test(testName: string, passed: boolean, assertionMessage: string): string
}

class QUnitTestGenerator implements TestGenerator {
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

class MochaTestGenerator implements TestGenerator {
  suiteHeader(suiteName: string) {
    return `describe('${escape(suiteName)}', function() {\n`;
  }

  suiteFooter() {
    return '});\n';
  }

  test(testName: string, passed: boolean, assertionMessage: string) {
    return (
      `  it('${escape(testName)}', function() {\n` +
      this.assertion(passed, assertionMessage) +
      `  });\n`
    );
  }

  assertion(passed: boolean, assertionMessage: string) {
    if (passed) {
      return `    // test passed\n`;
    }

    return (
      `    // test failed\n`+
      `    var error = new chai.AssertionError('${escape(assertionMessage)}');\n` +
      `    error.stack = undefined;\n` +
      `    throw error;\n`
    );
  }
}

let qunit = new QUnitTestGenerator();
let mocha = new MochaTestGenerator();

let generators: { [name: string]: TestGenerator } = { qunit, mocha };

module.exports = generators;
