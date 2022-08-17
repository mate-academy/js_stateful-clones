'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newObj = { ...state };
  let secObj = {};

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const [key, value] of Object.entries(action.extraData)) {
        newObj[key] = value;
      }
      secObj = { ...newObj };
      result.push(secObj);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newObj[key];
      }
      secObj = { ...newObj };
      result.push(secObj);
    }

    if (action.type === 'clear') {
      for (const key of Object.keys(newObj)) {
        delete newObj[key];
      }
      secObj = { ...newObj };
      result.push(secObj);
    }
  }
  // eslint-disable-next-line no-console
  console.log(secObj);
  // eslint-disable-next-line no-console
  console.log(result);

  return result;
}

// [
//   {foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world'},
//   {foo: 'bar', name: 'Jim'},
//   {foo: 'bar', name: 'Jim', another: 'one'}
// ].

// const states = {
//   foo: 'bar',
//   bar: 'foo',
// };

// const actionss = [
//   {
//     type: 'addProperties',
//     extraData: {
//       name: 'Jim',
//       hello: 'world',
//     },
//   },
//   {
//     type: 'removeProperties',
//     keysToRemove: ['bar', 'hello'],
//   },
//   {
//     type: 'addProperties',
//     extraData: {
//       another: 'one',
//     },
//   },
// ];

// transformStateWithClones(states, actionss);

// const states = {
//   foo: 'bar', name: 'Jim', another: 'one',
// };

// transformStateWithClones(states, [
//   {
//     type: 'removeProperties', keysToRemove: ['another'],
//   },
//   { type: 'clear' },
//   { type: 'clear' },
//   { type: 'clear' },
//   {
//     type: 'addProperties', extraData: { yet: 'another property' },
//   },
//   { type: 'clear' },
//   {
//     type: 'addProperties',
//     extraData: {
//       foo: 'bar', name: 'Jim',
//     },
//   },
//   {
//     type: 'removeProperties', keysToRemove: ['name', 'hello'],
//   },
// ]);

module.exports = transformStateWithClones;
