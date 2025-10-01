'use strict';

// /**
//  * @param {Object} state
//  * @param {Object[]} actions
//  *
//  * @return {Object[]}
//  */

// const states = {
//   foo: 'bar',
//   bar: 'foo',
// };

function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };

        break;

      case 'removeProperties':
        const removed = { ...newState };

        for (const key of action.keysToRemove) {
          delete removed[key];
        }

        newState = removed;
        break;

      case 'clear':
        const clear = { ...newState };

        for (const key in clear) {
          delete clear[key];
        }

        newState = clear;
        break;

      default:
        throw new Error('Unknown action type: ' + action.type);
    }

    result.push({ ...newState });
  }

  return result;
}

// transformStateWithClones(states, [
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

module.exports = transformStateWithClones;
