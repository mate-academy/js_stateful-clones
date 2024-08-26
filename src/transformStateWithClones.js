'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [{ ...state }];

  if (actions[0].type === 'clear') {
    stateHistory[0] = {};
  }

  if (actions[0].type === 'addProperties') {
    const extraData = actions[0].extraData;

    for (const key in extraData) {
      stateHistory[0][key] = extraData[key];
    }
  }

  if (actions[0].type === 'removeProperties') {
    const keysToRemove = actions[0].keysToRemove;

    for (let y = 0; y < keysToRemove.length; y++) {
      delete stateHistory[0][keysToRemove[y]];
    }
  }

  for (let i = 1; i < actions.length; i++) {
    if (actions[i].type === 'clear') {
      stateHistory[i] = {};
    }

    if (actions[i].type === 'addProperties') {
      stateHistory[i] = { ...stateHistory[i - 1] };

      const extraData = actions[i].extraData;

      for (const key in extraData) {
        stateHistory[i][key] = extraData[key];
      }
    }

    if (actions[i].type === 'removeProperties') {
      stateHistory[i] = { ...stateHistory[i - 1] };

      const keysToRemove = actions[i].keysToRemove;

      for (let y = 0; y < keysToRemove.length; y++) {
        delete stateHistory[i][keysToRemove[y]];
      }
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
