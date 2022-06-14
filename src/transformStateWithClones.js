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
    if (object.type === `addProperties`) {
      Object.assign(newState, object.extraData);
      array.push({ ...newState });
    }

    if (object.type === `clear`) {
      for (const key in newState) {
        delete newState[key];
      }
      array.push({ ...newState });
    }

    if (object.type === `removeProperties`) {
      object.keysToRemove.forEach((el) => {
        if (newState[el]) {
          delete newState[el];
        }
      });
      array.push({ ...newState });
    }
  }

  return array;
}

module.exports = transformStateWithClones;
