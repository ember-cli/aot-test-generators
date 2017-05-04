import 'mocha';
import { expect } from 'chai';

import MochaTestGenerator from '../lib/mocha';

describe('MochaTestGenerator', function() {
  let generator: MochaTestGenerator;

  beforeEach(function() {
    generator = new MochaTestGenerator();
  });

  describe('suiteHeader()', function() {
    it('generates test suite header code', function() {
      expect(generator.suiteHeader('suite-name'))
        .to.equal(`describe('suite-name', function() {\n`);
    });

    it('escapes the test suite name', function() {
      expect(generator.suiteHeader(`foo'bar`)).to.contain(`'foo\\'bar'`);
    });
  });

  describe('suiteFooter()', function() {
    it('generates test suite footer code', function() {
      expect(generator.suiteFooter()).to.equal(`});\n`);
    });
  });

  describe('test()', function() {
    it('generates passing tests', function() {
      expect(generator.test('test-name', true, 'assertion-message')).to.equal([
        `  it('test-name', function() {`,
        `    // test passed`,
        `  });\n`,
      ].join('\n'));
    });

    it('generates failing tests', function() {
      expect(generator.test('test-name', false, 'assertion-message')).to.equal([
        `  it('test-name', function() {`,
        `    // test failed`,
        `    var error = new chai.AssertionError('assertion-message');`,
        `    error.stack = undefined;`,
        `    throw error;`,
        `  });\n`,
      ].join('\n'));
    });

    it('escapes the test name', function() {
      expect(generator.test(`foo'bar`, false, 'assertion-message'))
        .to.contain(`'foo\\'bar'`);
    });

    it('escapes the assertion-message', function() {
      expect(generator.test('test-name', false, `foo'bar`))
        .to.contain(`'foo\\'bar'`);
    });
  });
});
