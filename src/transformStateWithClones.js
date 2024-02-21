'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = Object.assign({}, state);
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        copyState = Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }

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
