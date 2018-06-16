// moment
import Bluebird from 'bluebird';

import {
  setResolver, tcf
} from '../src';

const div = document.createElement('div');

document.body.style.backgroundColor = '#0d0d0d';
document.body.style.color = '#f0f0f0';
document.body.style.margin = 0;
document.body.style.padding = '15px';

// setResolver((tryFn) => new Bluebird((resolve) => resolve(tryFn())));

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

// regular async
tcf
  .async(() => new Bluebird((resolve) => setTimeout(() => resolve('async foo'), 1000)))
  .then((value) => console.log('success async', value));

// do nothing on error async
tcf
  .async(() => new Promise((resolve, reject) => setTimeout(() => reject(Error('async boom')), 1000)))
  .then((value) => console.log('do nothing on error async', value));

// do something on error async
tcf
  .async(
    () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('async boom')), 1000)),
    (error) => console.error(error)
  )
  .then((value) => console.log('do something on error async', value));

// do something in finally async
tcf
  .async(() => new Promise((resolve) => setTimeout(() => resolve('async foo'), 1000)), null, () =>
    console.log('async finally')
  )
  .then((value) => console.log('do something in finally async', value));

// do something in finally unsafe async
tcf
  .async(() => new Promise((resolve) => setTimeout(() => resolve('async foo'), 1000)), null, () => 'async finally')
  .then((value) => console.log('do something in finally unsafe async', value));

div.textContent = 'Check the console.';

document.body.appendChild(div);
