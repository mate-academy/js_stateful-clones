'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const modifyActions = [];
  const modifyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(modifyState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete modifyState[key];
        }
        break;

      case 'clear':
        Object.keys(modifyState).forEach(key =>
          delete modifyState[key]);
        break;
    }

    const modifyStates = {
      ...modifyState,
    };

    modifyActions.push(modifyStates);
  }

  return modifyActions;
}

module.exports = transformStateWithClones;
