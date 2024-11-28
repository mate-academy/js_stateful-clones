'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedActions = { ...state };
  const modifiedState = [];

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(clonedActions, key.extraData);
        break;

      case 'removeProperties':
        const remuv = { ...key.keysToRemove };

        for (const removeKey of Object.values(remuv)) {
          delete clonedActions[removeKey];
        }
        break;

      case 'clear':
        for (const value in clonedActions) {
          delete clonedActions[value];
        }
        break;
    }
    modifiedState.push({ ...clonedActions });
  }

  return modifiedState;
}

module.exports = transformStateWithClones;
