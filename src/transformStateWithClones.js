'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateCopy[keyToRemove];
        };
        break;

      case 'clear':
        for (const field in stateCopy) {
          delete stateCopy[field];
        }
        break;

      default:
        throw new Error('Invalid operation');
    }

    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
