'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateTemp = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        for (const key in obj.extraData) {
          Object.assign(stateTemp, { [key]: obj.extraData[key] });
        }
        const stateTemp1 = { ...stateTemp };
        stateHistory[stateHistory.length] = stateTemp1;
        break;
      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          delete stateTemp[key];
        }
        const stateTemp2 = { ...stateTemp };
        stateHistory[stateHistory.length] = stateTemp2;
        break;
      case 'clear':
        for (const key in stateTemp) {
          delete state2[key];
        }
        const stateTemp3 = { ...stateTemp };
        stateHistory[stateHistory.length] = stateTemp3;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
