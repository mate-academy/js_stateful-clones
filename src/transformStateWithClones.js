'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneStates = [];
  const cloneState = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(property => delete cloneState[property]);
        break;
      case 'clear':
        for (const property in cloneState) {
          delete cloneState[property];
        }
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    cloneStates.push({ ...cloneState });
  });

  return cloneStates;
}

module.exports = transformStateWithClones;
