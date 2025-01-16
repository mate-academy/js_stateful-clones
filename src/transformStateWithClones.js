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
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          if (key in currentState) {
            delete currentState[key];
          }
        }
        break;
      case 'clear':
        currentState = {};
        break;
    }

    propertiesHistory.push({ ...currentState });
  }

  return propertiesHistory;
}

module.exports = transformStateWithClones;
