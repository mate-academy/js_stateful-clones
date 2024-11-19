'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayStates = [];
  let stateClone = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        stateClone = {};
        break;
      case 'addProperties':
        stateClone = { ...stateClone, ...action.extraData };
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    arrayStates.push({ ...stateClone });
  });

  return arrayStates;
}

module.exports = transformStateWithClones;
