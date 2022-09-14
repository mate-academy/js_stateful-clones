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

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      case 'removeProperties':
        for (const key in newState) {
          if (actions[i].keysToRemove.includes(key)) {
            delete newState[key];
          }
        }
        break;

      case 'addProperties' :
        Object.assign(newState, actions[i].extraData);
        break;
    }
    returnObjects.push({ ...newState });
  }

  return returnObjects;
}

module.exports = transformStateWithClones;
