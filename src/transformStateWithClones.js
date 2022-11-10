'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const currentState = { ...state };
  const historyOfChanges = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        historyOfChanges.push({ ...currentState });
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete currentState[prop];
        }
        historyOfChanges.push({ ...currentState });
        break;

      case 'clear':
        for (const prop in currentState) {
          delete currentState[prop];
        }
        historyOfChanges.push({});
        break;
    }
  }

  return historyOfChanges;
}

module.exports = transformStateWithClones;
