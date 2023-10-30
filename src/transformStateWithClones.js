'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [Object.assign({}, state)];

  for (const action of actions) {
    const stateCopy = Object.assign({}, stateHistory[stateHistory.length - 1]);

    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        stateCopy[key] = action.extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }
    } else if (action.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
    }

    stateHistory.push(stateCopy);
  }

  return stateHistory.slice(1);
}

module.exports = transformStateWithClones;
