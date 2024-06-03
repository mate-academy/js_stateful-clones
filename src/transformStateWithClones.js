'use strict';
/* eslint-disable */
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const historyChanges = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        newState = {
          ...newState,
          ...actions[i].extraData,
        };
        break;
      case 'removeProperties':
        for (const fieldName of actions[i].keysToRemove) {
          delete newState[fieldName];
        }
        break;
      case 'clear':
        newState = {};
        break;
      default:
        break;
    }
    historyChanges.push({ ...newState });
  }
  return historyChanges;
}

module.exports = transformStateWithClones;
/* eslint-enable */
