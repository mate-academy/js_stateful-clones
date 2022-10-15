'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const NewArray = [];
  let massive = { ...state };

  for (let numArr = 0; numArr < actions.length; numArr++) {
    const action = Object.assign({}, actions[numArr]);

    for (const key in action) { // loop all types in array 'action'
      if (action[key] === 'addProperties') {
        const state1 = { ...massive };

        Object.assign(state1, action.extraData);
        NewArray.push(state1);

        for (const b in massive) {
          delete massive[b];
        }
        massive = { ...state1 };
      } else if (action[key] === 'clear') {
        const state2 = { ...massive };

        for (const x in state2) {
          delete state2[x];
        };

        NewArray.push(state2);

        for (const b in massive) {
          delete massive[b];
        }
        massive = { ...state2 };
      } else if (action[key] === 'removeProperties') {
        const state3 = { ...massive };

        for (let keyRem = 0; keyRem < action.keysToRemove.length; keyRem++) {
          for (const x in state3) {
            if (x === action.keysToRemove[keyRem]) {
              delete state3[x];
            }
          }
        }
        NewArray.push(state3);

        for (const b in massive) {
          delete massive[b];
        }
        massive = { ...state3 };
      }
    }
  }

  return NewArray;
}

module.exports = transformStateWithClones;
