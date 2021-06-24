'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const modifyActions = [];
  const modifiedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(modifiedState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete modifiedState[key];
        }
        break;

      case 'clear':
        Object.keys(modifiedState).forEach(key =>
          delete modifiedState[key]);
        break;
    }

    const modifyStates = {
      ...modifiedState,
    };

    modifyActions.push(modifyStates);
  }

  return modifyActions;
}

module.exports = transformStateWithClones;
