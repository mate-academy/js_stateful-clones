'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const transformedState = [];

  for (let i = 0; i < actions.length; i++) {
    if (i === 0) {
      transformedState[i] = { ...state };
    } else {
      transformedState[i] = { ...transformedState[i - 1] };
    }

    if (actions[i]['type'] === 'clear') {
      transformedState[i] = {};
    }

    if (actions[i]['type'] === 'addProperties') {
      transformedState[i] = Object.assign(
        {},
        transformedState[i],
        actions[i]['extraData'],
      );
    }

    if (actions[i]['type'] === 'removeProperties') {
      for (const key of actions[i]['keysToRemove']) {
        delete transformedState[i][key];
      }
    }
  }

  return transformedState;
}

// transformStateWithClones(state, [
//   {
//     type: 'addProperties',
//     extraData: { name: 'Jim', hello: 'world' },
//   },
//   {
//     type: 'removeProperties',
//     keysToRemove: ['bar', 'hello'],
//   },
//   {
//     type: 'addProperties',
//     extraData: { another: 'one' },
//   },
// ]);

// transformStateWithClones(state, [
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

module.exports = transformStateWithClones;
