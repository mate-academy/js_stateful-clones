'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateClone = Object.assign({}, state);

  for (const element of actions) {
    if (element.type === 'addProperties') {
      Object.assign(stateClone, element.extraData);
    }

    if (element.type === 'removeProperties') {
      for (const key of element.keysToRemove) {
        if (key in stateClone) {
          delete stateClone[key];
        }
      }
    }

    if (element.type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }

    stateHistory.push(Object.assign({}, stateClone));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
