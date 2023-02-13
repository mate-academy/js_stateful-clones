'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfActions = [];
  let currentAction = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentAction, action.extraData);
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete currentAction[property];
        }
        break;

      case 'clear':
        currentAction = {};
        break;

      default:
        break;
    }

    arrayOfActions.push({ ...currentAction });
  }

  return arrayOfActions;
}

module.exports = transformStateWithClones;
