// test
import test from 'ava';
import sinon from 'sinon';

// src
import * as resolver from 'src/resolver';

test('if defaultResolver will return a method that resolves the function passed', async (t) => {
  const value = {};
  const fn = sinon.stub().resolves(value);

  const result = await resolver.defaultResolver(fn);

  t.is(result, value);
});

test.serial('if the default resolver is correctly assigned to the resolver cache', (t) => {
  t.is(resolver.RESOLVER.resolve, resolver.defaultResolver);
});

test.serial('if setResolver will set the new resolver in the resolver cache', (t) => {
  const newResolver = () => {};

  const result = resolver.setResolver(newResolver);

  t.is(resolver.RESOLVER.resolve, newResolver);

  t.true(result);

  resolver.RESOLVER.resolve = resolver.defaultResolver;
});

test.serial('if setResolver will not set the new resolver in the resolver cache if not a function', (t) => {
  const newResolver = null;

  const result = resolver.setResolver(newResolver);

  t.is(resolver.RESOLVER.resolve, resolver.defaultResolver);

  t.false(result);
});
