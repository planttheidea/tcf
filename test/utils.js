// test
import test from 'ava';

// src
import * as utils from 'src/utils';

test('if noop will return nothing passed to it', (t) => {
  const params = ['foo', 'bar', 'baz'];

  const result = utils.noop(...params);

  t.is(result, void 0);
});

test('if getNormalizedFunction will return the function passed', (t) => {
  const fn = () => {};

  const result = utils.getNormalizedFunction(fn);

  t.is(result, fn);
});

test('if getNormalizedFunction will return noop if the object passed is not a function', (t) => {
  const fn = null;

  const result = utils.getNormalizedFunction(fn);

  t.is(result, utils.noop);
});
