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

  for (const i of actions) {
    if (i.type === 'clear') {
      for (const key in currentState) {
        delete currentState[key];
      }

      stateReport.push({});
      continue;
    }

    if (i.type === 'addProperties') {
      for (const key in i.extraData) {
        currentState[key] = i.extraData[key];
      }

      stateReport.push({ ...currentState });
      continue;
    }

    if (i.type === 'removeProperties') {
      for (const key of i.keysToRemove) {
        if (currentState[key]) {
          delete currentState[key];
        }
      }

      stateReport.push({ ...currentState });
      continue;
    }
  }

  return stateReport;
}

module.exports = transformStateWithClones;
