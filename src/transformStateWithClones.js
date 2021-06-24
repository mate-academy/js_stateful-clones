'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const changedActions = [];
  const changedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(changedState, action.extraData);
        break;
      case 'removeProperties':

        for (const key of action.keysToRemove) {
          if (changedState.hasOwnProperty(key)) {
            delete changedState[key];
          }
        }
        break;

      case 'clear':
        Object.keys(changedState).forEach(key =>
          delete changedState[key]);
        break;
    }

    const changedStates = {
      ...changedState,
    };

    changedActions.push(changedStates);
  }

  return changedActions;
}

module.exports = transformStateWithClones;
