'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(function (key) {
        delete stateCopy[key];
      });
    }

    if (action.type === 'clear') {
      for (const key in stateCopy) {
        if (stateCopy.hasOwnProperty(key)) {
          delete stateCopy[key];
        }
      }
    }

    currentState.push({ ...stateCopy });
  }

  return currentState;
}

module.exports = transformStateWithClones;
