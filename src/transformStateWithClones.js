'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let copyState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        copyState[key] = action.extraData[key];
      }
      stateHistory.push({ ...copyState });
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete copyState[key];
      }
      stateHistory.push({ ...copyState });
    } else if (action.type === 'clear') {
      copyState = {};
      stateHistory.push({ ...copyState });
    } else {
      return 'asd';
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
