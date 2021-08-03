'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arrayStateActions = [];
  const stateCopy = { ...state };
  const clearAction = 'clear';
  const addPropertiesAction = 'addProperties';
  const removePropertiesAction = 'removeProperties';

  for (const action of actions) {
    switch (action.type) {
      case clearAction:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      case addPropertiesAction:
        Object.assign(stateCopy, action.extraData);
        break;
      case removePropertiesAction:
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
    }

    arrayStateActions.push(Object.assign({}, stateCopy));
  }

  return arrayStateActions;
}

module.exports = transformStateWithClones;
