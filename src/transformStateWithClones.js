'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfActions = [];
  let copyOfState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyOfState, action.extraData);
        break;

      case 'removeProperties':
        for (const keyForRemove of action.keysToRemove) {
          delete copyOfState[keyForRemove];
        }
        break;

      case 'clear':
        copyOfState = {};
        break;

      default:
        break;
    }

    arrayOfActions.push({ ...copyOfState });
  }

  return arrayOfActions;
}

module.exports = transformStateWithClones;
