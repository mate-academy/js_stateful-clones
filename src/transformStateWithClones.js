'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const listOfActions = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      Object.keys(cloneState).forEach(n => delete cloneState[n]);
    }

    if (action.type === 'addProperties') {
      if (action.extraData) {
        Object.assign(cloneState, action.extraData);
      }
    }

    if (action.type === 'removeProperties') {
      if (action.keysToRemove) {
        for (const key of action.keysToRemove) {
          if (key in cloneState) {
            delete cloneState[key];
          }
        }
      }
    }

    listOfActions.push({ ...cloneState });
  }

  return listOfActions;
}

module.exports = transformStateWithClones;
