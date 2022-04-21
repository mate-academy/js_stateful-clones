'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalState = { ...state };
  const historyChange = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(finalState, action.extraData);
        historyChange.push({ ...finalState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete finalState[key];
        }
        historyChange.push({ ...finalState });
        break;

      case 'clear':
        for (const keys in finalState) {
          delete finalState[keys];
        }
        historyChange.push({ ...finalState });
        break;
    }
  }

  return historyChange;
}

module.exports = transformStateWithClones;
