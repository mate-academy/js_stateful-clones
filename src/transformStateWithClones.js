'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopyWithActions = [];
  const stateCopy = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(property => delete stateCopy[property]);
        break;
      case 'clear':
        for (const property in stateCopy) {
          delete stateCopy[property];
        }
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateCopyWithActions.push({ ...stateCopy });
  });

  return stateCopyWithActions;
}

module.exports = transformStateWithClones;
