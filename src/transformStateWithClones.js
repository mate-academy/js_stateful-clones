'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const propertiesHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
      propertiesHistory.push({ ...currentState });
    }

    if (action.type === 'removeProperties') {
      currentState = { ...currentState };

      for (const key of action.keysToRemove) {
        if (key in currentState) {
          delete currentState[key];
        }
      }

      propertiesHistory.push({ ...currentState });
    }

    if (action.type === 'clear') {
      currentState = {};
      propertiesHistory.push({ ...currentState });
    }
  }

  return propertiesHistory;
}

module.exports = transformStateWithClones;
