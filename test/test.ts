import 'mocha';
import { expect } from 'chai';

const testGenerators = require('..');

describe('aot-test-generators', function() {
  it('exports an object with "qunit" and "mocha" keys', function() {
    expect(Object.keys(testGenerators)).to.deep.equal(['qunit', 'mocha']);
  });
});
