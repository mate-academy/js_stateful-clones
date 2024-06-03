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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newState = {
          ...newState,
          ...action.extraData,
        };
        break;
      case 'removeProperties':
        for (const fieldName of action.keysToRemove) {
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
