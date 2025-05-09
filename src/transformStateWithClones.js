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

// const actions = [
//   {
//     type: 'addProperties',
//     extraData: { yet: 'another property' },
//   },
//   { type: 'clear' },
//   {
//     type: 'addProperties',
//     extraData: { foo: 'bar', name: 'Jim' },
//   },
// ];

function transformStateWithClones(state, actions) {
  const arr = [];
  let currentState = { ...state };

  for (const action of actions) {
    let obj = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(obj, action.extraData);

        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete obj[key];
        }

        break;
      case 'clear':
        obj = {};

        break;
    }
    arr.push(obj);
    currentState = obj;
  }

  return arr;
}

module.exports = transformStateWithClones;
