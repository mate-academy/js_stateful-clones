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
  const returnObjects = [];

  for (const val of actions) {
    switch (val.type) {
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      case 'removeProperties':
        for (const key in newState) {
          if (val.keysToRemove.includes(key)) {
            delete newState[key];
          }
        }
        break;

      case 'addProperties' :
        Object.assign(newState, val.extraData);
        break;
    }
    returnObjects.push({ ...newState });
  }

  return returnObjects;
}

module.exports = transformStateWithClones;
