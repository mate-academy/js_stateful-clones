'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const stateClone = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateClone, action.extraData);

      const added = { ...stateClone };

      resultArray.push(added);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateClone[key];
      }

      const removed = { ...stateClone };

      resultArray.push(removed);
    }

    if (action.type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }

      const cleared = { ...stateClone };

      resultArray.push(cleared);
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
