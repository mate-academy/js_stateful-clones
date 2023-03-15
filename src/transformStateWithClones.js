'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const modifiedStateCopies = [];
  const stateCopy = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(property => {
          delete stateCopy[property];
        });
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    modifiedStateCopies.push({ ...stateCopy });
  });

  return modifiedStateCopies;
}

module.exports = transformStateWithClones;
