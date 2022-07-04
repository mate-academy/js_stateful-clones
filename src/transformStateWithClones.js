'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateActions = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;
    }

    stateActions.push({ ...currentState });
  }

  return stateActions;
}

module.exports = transformStateWithClones;
