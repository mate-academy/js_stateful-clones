'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const historyState = [];
  const newState = { ...state };

  for (const action of actions) {
    const type = action.type;

    switch (type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);

        historyState.push({ ...newState });
        break;
      case 'removeProperties':

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        historyState.push({ ...newState });
        break;
      case 'clear':
        for (const prop of Object.keys(newState)) {
          delete newState[prop];
        }
        historyState.push({ ...newState });
        break;

      default:
        return newState;
    }
  }

  return historyState;
}

module.exports = transformStateWithClones;
