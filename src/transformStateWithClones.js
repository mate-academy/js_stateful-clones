'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);

        break;

      case 'removeProperties':
        for (const keyRemove of action.keysToRemove) {
          delete stateCopy[keyRemove];
        }

        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }

        break;

      default:
        throw new Error('type of action is not valid');
    }
    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
