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
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete copyState[key];
      }
    } else if (action.type === 'clear') {
      copyState = {};
    } else {
      return 'asd';
    }
    stateHistory.push({ ...copyState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
