'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStateConditions = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const keytoRemove of action.keysToRemove) {
          delete stateCopy[keytoRemove];
        }
        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
    }
    allStateConditions.push({ ...stateCopy });
  }

  return allStateConditions;
}

module.exports = transformStateWithClones;
