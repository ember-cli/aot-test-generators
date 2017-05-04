import 'mocha';
import { expect } from 'chai';

import QUnitTestGenerator from '../lib/qunit';

describe('QUnitTestGenerator', function() {
  let generator: QUnitTestGenerator;

  beforeEach(function() {
    generator = new QUnitTestGenerator();
  });

  describe('suiteHeader()', function() {
    it('generates test suite header code', function() {
      expect(generator.suiteHeader('suite-name'))
        .to.equal(`QUnit.module('suite-name');\n`);
    });

    it('escapes the test suite name', function() {
      expect(generator.suiteHeader(`foo'bar`)).to.contain(`'foo\\'bar'`);
    });
  });

  describe('suiteFooter()', function() {
    it('generates test suite footer code', function() {
      expect(generator.suiteFooter()).to.equal('');
    });
  });

  describe('test()', function() {
    it('generates passing tests', function() {
      expect(generator.test('test-name', true, 'assertion-message')).to.equal([
        `QUnit.test('test-name', function(assert) {`,
        `  assert.expect(1);`,
        `  assert.ok(true, 'assertion-message');`,
        `});\n`,
      ].join('\n'));
    });

    it('generates failing tests', function() {
      expect(generator.test('test-name', false, 'assertion-message')).to.equal([
        `QUnit.test('test-name', function(assert) {`,
        `  assert.expect(1);`,
        `  assert.ok(false, 'assertion-message');`,
        `});\n`,
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
