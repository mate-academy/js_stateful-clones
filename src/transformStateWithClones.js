'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const newState = { ...state };
  const array = [];

  for (const object of actions) {
    switch (object.type) {
      case `addProperties`:
        Object.assign(newState, object.extraData);
        array.push({ ...newState });
        break;
      case `clear`:
        for (const key in newState) {
          delete newState[key];
        }
        array.push({ ...newState });
        break;
      case `removeProperties`:
        object.keysToRemove.forEach((el) => {
          if (newState[el]) {
            delete newState[el];
          }
        });
        array.push({ ...newState });
        break;
    }
  }

  return array;
}

module.exports = transformStateWithClones;
