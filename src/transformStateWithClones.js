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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete copyState[key];
        });
        break;
      case 'clear':
        copyState = {};
        break;
    }
    stateHistory.push({ ...copyState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
