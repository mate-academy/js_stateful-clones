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
    switch (action.type) {
      case 'clear':
        Object.keys(cloneState).forEach(n => delete cloneState[n]);
        break;

      case 'addProperties':
        if (action.extraData) {
          Object.assign(cloneState, action.extraData);
        }
        break;

      case 'removeProperties':
        if (action.keysToRemove) {
          for (const key of action.keysToRemove) {
            if (key in cloneState) {
              delete cloneState[key];
            }
          }
        }
        break;
    }

    listOfActions.push({ ...cloneState });
  }

  return listOfActions;
}

module.exports = transformStateWithClones;
