'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateReport = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;

      case 'addProperties':
        for (const key in action.extraData) {
          currentState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (currentState[key]) {
            delete currentState[key];
          }
        }
        break;
    }

    stateReport.push({ ...currentState });
  }

  return stateReport;
}

module.exports = transformStateWithClones;
