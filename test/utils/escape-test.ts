import 'mocha';
import { expect } from 'chai';

import escape from '../../lib/utils/escape';

describe('escape()', function() {
  it('escapes single quotes', function() {
    expect(escape(`foo'bar`)).to.equal(`'foo\\'bar'`);
  });

  it('escapes double quotes', function() {
    expect(escape('foo"bar')).to.equal(`'foo"bar'`);
  });

  it('escapes backticks', function() {
    expect(escape('foo`bar')).to.equal(`'foo\`bar'`);
  });

  it('escapes line breaks', function() {
    expect(escape('foo\nbar')).to.equal(`'foo\\nbar'`);
  });
});
