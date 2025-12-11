'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions = []) {
  const stateHistory = [];
  let copyState = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        copyState = { ...copyState, ...action.extraData };
        break;

      case 'removeProperties':
        const tempState = { ...copyState };

        action.keysToRemove.forEach((key) => {
          delete tempState[key];
        });
        copyState = tempState;
        break;

      case 'clear':
        copyState = {};
        break;
      default:
        break;
    }

    stateHistory.push(copyState);
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
