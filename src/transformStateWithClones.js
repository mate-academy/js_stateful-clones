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

  for (const i in actions) {
    if (actions[i].type === 'clear') {
      for (const key in currentState) {
        delete currentState[key];
      }

      stateReport.push({});
      continue;
    }

    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        currentState[key] = actions[i].extraData[key];
      }

      stateReport.push({ ...currentState });
      continue;
    }

    if (actions[i].type === 'removeProperties') {
      for (const key in actions[i].keysToRemove) {
        if (currentState[actions[i].keysToRemove[key]]) {
          delete currentState[actions[i].keysToRemove[key]];
        }
      }

      stateReport.push({ ...currentState });
      continue;
    }
  }

  return stateReport;
}

module.exports = transformStateWithClones;
