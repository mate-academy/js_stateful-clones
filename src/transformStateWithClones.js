'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currState[key];
        }

        break;

      case 'clear':
        for (const key in currState) {
          delete currState[key];
        }

        break;
    }

    stateHistory.push({ ...currState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
