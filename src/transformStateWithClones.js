'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const NewArray = [];
  let array = { ...state };

  for (const numArr of actions) {
    const action = Object.assign({}, numArr);

    for (const key in action) {
      if (action[key] === 'addProperties') {
        const state1 = { ...array };

        Object.assign(state1, action.extraData);
        NewArray.push(state1);

        for (const b in array) {
          delete array[b];
        };

        array = { ...state1 };
      } else if (action[key] === 'clear') {
        const state1 = { ...array };

        for (const x in state1) {
          delete state1[x];
        };

        NewArray.push(state1);

        for (const b in array) {
          delete array[b];
        };

        array = { ...state1 };
      } else if (action[key] === 'removeProperties') {
        const state1 = { ...array };

        for (let keyRem = 0; keyRem < action.keysToRemove.length; keyRem++) {
          for (const x in state1) {
            if (x === action.keysToRemove[keyRem]) {
              delete state1[x];
            };
          };
        };
        NewArray.push(state1);

        for (const b in array) {
          delete array[b];
        };

        array = { ...state1 };
      }
    }
  }

  return NewArray;
}

module.exports = transformStateWithClones;
