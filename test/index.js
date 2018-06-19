// test
import test from 'ava';
import sinon from 'sinon';

// src
import * as index from 'src/index';
import * as resolver from 'src/resolver';

test('if tcfSync will handle a successful try scenario', (t) => {
  const value = 'foo';

  const tryFn = () => value;
  const catchFn = null;
  const finallyFn = null;

  const result = index.tcfSync(tryFn, catchFn, finallyFn);

  t.is(result, value);
});

test('if tcfSync will handle a failed try scenario with no catch', (t) => {
  const tryFn = () => {
    throw new Error('boom');
  };
  const catchFn = null;
  const finallyFn = null;

  const result = index.tcfSync(tryFn, catchFn, finallyFn);

  t.is(result, void 0);
});

test('if tcfSync will handle a failed try scenario with a catch', (t) => {
  const error = new Error('boom');
  const value = 'foo';

  const tryFn = () => {
    throw error;
  };
  const catchFn = sinon.stub().returns(value);

  const finallyFn = null;

  const result = index.tcfSync(tryFn, catchFn, finallyFn);

  t.true(catchFn.calledOnce);
  t.true(catchFn.calledWith(error));

  t.is(result, value);
});

test('if tcfSync will handle a successful try scenario with a finally with no return in the finally', (t) => {
  const value = 'foo';

  const tryFn = () => value;
  const catchFn = null;
  const finallyFn = sinon.spy();

  const result = index.tcfSync(tryFn, catchFn, finallyFn);

  t.is(result, value);
  t.true(finallyFn.calledOnce);
});

test('if tcfSync will handle a successful try scenario with a finally with a return in the finally', (t) => {
  const value = 'foo';
  const otherValue = 'bar';

  const tryFn = () => value;
  const catchFn = null;
  const finallyFn = sinon.stub().returns(otherValue);

  const result = index.tcfSync(tryFn, catchFn, finallyFn);

  t.is(result, otherValue);
  t.true(finallyFn.calledOnce);
});

test('if tcfSync will handle a failed try scenario with a finally with no return in the finally', (t) => {
  const error = new Error('boom');

  const tryFn = () => {
    throw error;
  };
  const catchFn = sinon.spy();
  const finallyFn = sinon.spy();

  const result = index.tcfSync(tryFn, catchFn, finallyFn);

  t.is(result, void 0);

  t.true(catchFn.calledOnce);
  t.true(catchFn.calledWith(error));

  t.true(finallyFn.calledOnce);
});

test('if tcfSync will handle a failed try scenario with a finally with a return in the finally', (t) => {
  const error = new Error('boom');
  const value = 'foo';

  const tryFn = () => {
    throw error;
  };
  const catchFn = sinon.spy();
  const finallyFn = sinon.stub().returns(value);

  const result = index.tcfSync(tryFn, catchFn, finallyFn);

  t.is(result, value);

  t.true(catchFn.calledOnce);
  t.true(catchFn.calledWith(error));

  t.true(finallyFn.calledOnce);
});

test('if tcfAsync will handle a successful try scenario', async (t) => {
  const value = 'foo';

  const tryFn = async () => value;
  const catchFn = null;
  const finallyFn = null;

  const result = await index.tcfAsync(tryFn, catchFn, finallyFn);

  t.is(result, value);
});

test('if tcfAsync will handle a failed try scenario with no catch', async (t) => {
  const tryFn = async () => {
    throw new Error('boom');
  };
  const catchFn = null;
  const finallyFn = null;

  const result = await index.tcfAsync(tryFn, catchFn, finallyFn);

  t.is(result, void 0);
});

test('if tcfAsync will handle a failed try scenario with a catch', async (t) => {
  const error = new Error('boom');
  const value = 'foo';

  const tryFn = async () => {
    throw error;
  };
  const catchFn = sinon.stub().returns(value);

  const finallyFn = null;

  const result = await index.tcfAsync(tryFn, catchFn, finallyFn);

  t.true(catchFn.calledOnce);
  t.true(catchFn.calledWith(error));

  t.is(result, value);
});

test('if tcfAsync will handle a successful try scenario with a finally with no return in the finally', async (t) => {
  const value = 'foo';

  const tryFn = async () => value;
  const catchFn = null;
  const finallyFn = sinon.spy();

  const result = await index.tcfAsync(tryFn, catchFn, finallyFn);

  t.is(result, value);
  t.true(finallyFn.calledOnce);
});

test('if tcfAsync will handle a successful try scenario with a finally with a return in the finally', async (t) => {
  const value = 'foo';
  const otherValue = 'bar';

  const tryFn = async () => value;
  const catchFn = null;
  const finallyFn = sinon.stub().returns(otherValue);

  const result = await index.tcfAsync(tryFn, catchFn, finallyFn);

  t.is(result, otherValue);
  t.true(finallyFn.calledOnce);
});

test('if tcfAsync will handle a failed try scenario with a finally with no return in the finally', async (t) => {
  const error = new Error('boom');

  const tryFn = async () => {
    throw error;
  };
  const catchFn = sinon.spy();
  const finallyFn = sinon.spy();

  const result = await index.tcfAsync(tryFn, catchFn, finallyFn);

  t.is(result, void 0);

  t.true(catchFn.calledOnce);
  t.true(catchFn.calledWith(error));

  t.true(finallyFn.calledOnce);
});

test('if tcfAsync will handle a failed try scenario with a finally with a return in the finally', async (t) => {
  const error = new Error('boom');
  const value = 'foo';

  const tryFn = async () => {
    throw error;
  };
  const catchFn = sinon.spy();
  const finallyFn = sinon.stub().returns(value);

  const result = await index.tcfAsync(tryFn, catchFn, finallyFn);

  t.is(result, value);

  t.true(catchFn.calledOnce);
  t.true(catchFn.calledWith(error));

  t.true(finallyFn.calledOnce);
});

test('if tcf will handle sync operations', (t) => {
  const value = 'foo';

  const tryFn = () => value;
  const catchFn = null;
  const finallyFn = sinon.spy();

  const result = index.tcf(tryFn, catchFn, finallyFn);

  t.is(result, value);

  t.true(finallyFn.calledOnce);
});

test('if tcf will handle async operations', async (t) => {
  const value = 'foo';

  const tryFn = async () => value;
  const catchFn = null;
  const finallyFn = sinon.spy();

  const result = await index.tcf(tryFn, catchFn, finallyFn);

  t.is(result, value);

  t.true(finallyFn.calledOnce);
});

test('if tfSync will handle a successful try scenario', (t) => {
  const value = 'foo';

  const tryFn = () => value;
  const finallyFn = null;

  const result = index.tfSync(tryFn, finallyFn);

  t.is(result, value);
});

test('if tfSync will handle a failed try scenario with no catch', (t) => {
  const tryFn = () => {
    throw new Error('boom');
  };
  const finallyFn = null;

  try {
    index.tfSync(tryFn, finallyFn);

    t.fail('Should throw');
  } catch (error) {
    t.pass(error);
  }
});

test('if tfSync will handle a successful try scenario with a finally with no return in the finally', (t) => {
  const value = 'foo';

  const tryFn = () => value;
  const finallyFn = sinon.spy();

  const result = index.tfSync(tryFn, finallyFn);

  t.is(result, value);
  t.true(finallyFn.calledOnce);
});

test('if tfSync will handle a successful try scenario with a finally with a return in the finally', (t) => {
  const value = 'foo';
  const otherValue = 'bar';

  const tryFn = () => value;
  const finallyFn = sinon.stub().returns(otherValue);

  const result = index.tfSync(tryFn, finallyFn);

  t.is(result, otherValue);
  t.true(finallyFn.calledOnce);
});

test('if tfAsync will handle a successful try scenario', async (t) => {
  const value = 'foo';

  const tryFn = async () => value;
  const finallyFn = null;

  const result = await index.tfAsync(tryFn, finallyFn);

  t.is(result, value);
});

test('if tfAsync will handle a failed try scenario with no catch', async (t) => {
  const tryFn = async () => {
    throw new Error('boom');
  };
  const finallyFn = null;

  try {
    await index.tfAsync(tryFn, finallyFn);

    t.fail('Should throw');
  } catch (error) {
    t.pass(error);
  }
});

test('if tfAsync will handle a successful try scenario with a finally with no return in the finally', async (t) => {
  const value = 'foo';

  const tryFn = async () => value;
  const finallyFn = sinon.spy();

  const result = await index.tfAsync(tryFn, finallyFn);

  t.is(result, value);
  t.true(finallyFn.calledOnce);
});

test('if tfAsync will handle a successful try scenario with a finally with a return in the finally', async (t) => {
  const value = 'foo';
  const otherValue = 'bar';

  const tryFn = async () => value;
  const finallyFn = sinon.stub().returns(otherValue);

  const result = await index.tfAsync(tryFn, finallyFn);

  t.is(result, otherValue);
  t.true(finallyFn.calledOnce);
});

test('if tf will handle sync operations', (t) => {
  const value = 'foo';

  const tryFn = () => value;
  const finallyFn = sinon.spy();

  const result = index.tf(tryFn, finallyFn);

  t.is(result, value);

  t.true(finallyFn.calledOnce);
});

test('if tf will handle async operations', async (t) => {
  const value = 'foo';

  const tryFn = async () => value;
  const finallyFn = sinon.spy();

  const result = await index.tf(tryFn, finallyFn);

  t.is(result, value);

  t.true(finallyFn.calledOnce);
});

test('if tcf.async is the same method as tcfAsync', (t) => {
  t.is(index.tcf.async, index.tcfAsync);
});

test('if tcf.sync is the same method as tcfSync', (t) => {
  t.is(index.tcf.sync, index.tcfSync);
});

test('if tf.async is the same method as tfAsync', (t) => {
  t.is(index.tf.async, index.tfAsync);
});

test('if tf.sync is the same method as tfSync', (t) => {
  t.is(index.tf.sync, index.tfSync);
});

test('if tcf is the default export', (t) => {
  t.is(index.default, index.tcf);
});

test('if setResolver is exported', (t) => {
  t.is(index.setResolver, resolver.setResolver);
});
