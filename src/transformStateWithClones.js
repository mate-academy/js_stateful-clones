'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const resultArrayOfActions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(property => delete copyState[property]);
        break;

      case 'clear':
        Object.keys(copyState).forEach(property => delete copyState[property]);
        break;

      default:
        break;
    }

    resultArrayOfActions.push({ ...copyState });
  }

  return resultArrayOfActions;
}

module.exports = transformStateWithClones;
