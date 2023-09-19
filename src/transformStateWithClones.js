'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateClone = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      stateClone = Object.assign(stateClone, action.extraData);
      result.push({ ...stateClone });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateClone[key];
      }
      result.push({ ...stateClone });
    }

    if (action.type === 'clear') {
      stateClone = {};
      result.push({ ...stateClone });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
