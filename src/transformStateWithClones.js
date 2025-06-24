'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

// const state = {
//   foo: 'bar',
//   bar: 'foo',
// };
//
// const stateHistory = transformStateWithClones(state, [
//   {
//     type: 'addProperties',
//     extraData: {name: 'Jim', hello: 'world'},
//   },
//   {
//     type: 'removeProperties',
//     keysToRemove: ['bar', 'hello'],
//   },
//   {
//     type: 'addProperties',
//     extraData: {another: 'one'},
//   },
// ]);

// const stateHistory = transformStateWithClones(state, [
//   {
//     type: 'addProperties',
//     extraData: { yet: 'another property' },
//   },
//   { type: 'clear' },
//   {
//     type: 'addProperties',
//     extraData: { foo: 'bar', name: 'Jim' },
//   },
// ]);

// console.log(stateHistory);

function transformStateWithClones(initialState, actions) {
  const results = [];
  let currentState = { ...initialState };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => {
        if (currentState[key] !== undefined) {
          delete currentState[key];
        }
      });
    } else if (action.type === 'clear') {
      currentState = {};
    }

    results.push(currentState);
    currentState = { ...currentState };
  }

  return results;
}

module.exports = transformStateWithClones;
