'use strict';
/*
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const updateState = { ...state };
  const updateActions = [];

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(updateState, key.extraData);
        break;

      case 'removeProperties':
        for (const item of key.keysToRemove) {
          delete updateState[item];
        }
        break;

      case 'clear':
        for (const a in updateState) {
          delete updateState[a];
        }
        break;

      default:
        break;
    }
    updateActions.push({ ...updateState });
  }

  return updateActions;
}

module.exports = transformStateWithClones;
