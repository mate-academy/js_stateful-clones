'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateArr = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
      stateArr.push({ ...stateCopy });
      continue;
    }

    if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove) {
        delete stateCopy[keyToRemove];
      }
      stateArr.push({ ...stateCopy });
      continue;
    }

    if (action.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
      stateArr.push({ ...stateCopy });
    }
  }

  return stateArr;
}

module.exports = transformStateWithClones;
