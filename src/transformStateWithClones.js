'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const copyOfState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const addPropertiesData in action.extraData) {
          copyOfState[addPropertiesData] = action.extraData[addPropertiesData];
        }
        break;
      case 'removeProperties':
        for (const newKey of action.keysToRemove) {
          delete copyOfState[newKey];
        }
        break;
      case 'clear':
        for (const newKey in copyOfState) {
          delete copyOfState[newKey];
        }
        break;
    }
    stateHistory.push({ ...copyOfState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
