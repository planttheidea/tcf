// moment
import Bluebird from 'bluebird';

import {
  setResolver, tcf, tf
} from '../src';

const div = document.createElement('div');

document.body.style.backgroundColor = '#0d0d0d';
document.body.style.color = '#f0f0f0';
document.body.style.margin = 0;
document.body.style.padding = '15px';

// setResolver((tryFn) => new Bluebird((resolve) => resolve(tryFn())));

console.group('tcf sync');

// regular
console.log('success', tcf(() => 'foo'));

// do nothing on error
console.log(
  'do nothing on error',
  tcf(() => {
    throw new Error('boom');
  })
);

// do somethhing on error
console.log(
  'do something on error',
  tcf(
    () => {
      throw new Error('boom');
    },
    (error) => console.error(error)
  )
);

// do something in finally
console.log('do something in finally', tcf(() => console.log('foo') || 'returned', null, () => console.log('finally')));

// do something in finally unsafe
console.log('do something in finally unsafe', tcf(() => 'foo', () => {}, () => 'finally'));

console.groupEnd('tcf sync');

console.group('tf sync');

// regular
console.log('success', tf(() => 'foo'));

// do nothing on error
try {
  console.log(
    'blow up on error',
    tf(() => {
      throw new Error('boom');
    })
  );
} catch (error) {
  console.log('throws error');
}

// do something in finally
console.log('do something in finally', tf(() => console.log('foo') || 'returned', null, () => console.log('finally')));

// do something in finally unsafe
console.log('do something in finally unsafe', tf(() => 'foo', () => {}, () => 'finally'));

console.groupEnd('tf sync');

console.group('tcf async');

// regular async
tcf(() => new Bluebird((resolve) => setTimeout(() => resolve('async foo'), 1000))).then((value) =>
  console.log('success async', value)
);

// do nothing on error async
tcf(() => new Promise((resolve, reject) => setTimeout(() => reject(Error('async boom')), 1000))).then((value) =>
  console.log('do nothing on error async', value)
);

// do something on error async
tcf(
  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('async boom')), 1000)),
  (error) => console.error(error)
).then((value) => console.log('do something on error async', value));

// do something in finally async
tcf(() => new Promise((resolve) => setTimeout(() => resolve('async foo'), 1000)), null, () =>
  console.log('async finally')
).then((value) => console.log('do something in finally async', value));

// do something in finally unsafe async
tcf(() => new Promise((resolve) => setTimeout(() => resolve('async foo'), 1000)), null, () => 'async finally').then(
  (value) => console.log('do something in finally unsafe async', value)
);

console.groupEnd('tcf async');

console.group('tf async');

// regular async
tf(() => new Bluebird((resolve) => setTimeout(() => resolve('async foo'), 2000))).then((value) =>
  console.log('success tf async', value)
);

// do nothing on error async
tf(() => new Promise((resolve, reject) => setTimeout(() => reject(Error('async boom')), 2000))).then((value) =>
  console.log('do nothing on error tf async', value)
);

// do something in finally async
tf(
  () => new Promise((resolve) => setTimeout(() => resolve('async foo'), 2000)),
  () => console.log('tf async finally')
).then((value) => console.log('do something in finally tf async', value));

// do something in finally unsafe async
tf(() => new Promise((resolve) => setTimeout(() => resolve('async foo'), 2000)), () => 'tf async finally').then(
  (value) => console.log('do something in finally unsafe tf async', value)
);

console.groupEnd('tf async');

div.textContent = 'Check the console.';

document.body.appendChild(div);
