'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove) {
        if (stateCopy[keyToRemove]) {
          delete stateCopy[keyToRemove];
        }
      }
    }

    if (action.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
