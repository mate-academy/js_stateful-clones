'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const operationStep = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(e => delete copyState[e]);
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
      
      default: return 'Error';
    }

    operationStep.push({ ...copyState });
  }

  return operationStep;
}

module.exports = transformStateWithClones;
