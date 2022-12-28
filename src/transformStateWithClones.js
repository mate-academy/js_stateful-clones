'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformStates = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete stateCopy[key]);
        break;
      case 'clear':
        Object.keys(stateCopy).forEach(key => delete stateCopy[key]);
        break;
      default:
        throw new Error('Unexpected type of action');
    }
    transformStates.push({ ...stateCopy });
  }

  return transformStates;
}

module.exports = transformStateWithClones;
