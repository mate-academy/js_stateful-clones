'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const preperadeState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(preperadeState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete preperadeState[key];
        }

        break;

      case 'clear':
        for (const key in preperadeState) {
          delete preperadeState[key];
        }
        break;
    }

    stateHistory.push(Object.assign({}, preperadeState));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
