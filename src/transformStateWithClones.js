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
    if (actions[i].type === 'addProperties') {
      newState = {
        ...newState,
        ...actions[i].extraData,
      };
    } else if (actions[i].type === 'removeProperties') {
      for (const fieldName of actions[i].keysToRemove) {
        delete newState[fieldName];
      }
    } else if (actions[i].type === 'clear') {
      newState = {};
    }
    historyChanges.push({ ...newState });
  }

  return historyChanges;
}

module.exports = transformStateWithClones;
/* eslint-enable */
