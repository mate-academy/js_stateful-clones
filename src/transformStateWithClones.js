'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformResult = [];
  const stateClone = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }

    if (action.type === 'addProperties') {
      Object.assign(stateClone, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const rKey of action.keysToRemove) {
        delete stateClone[rKey];
      }
    }

    transformResult.push({ ...stateClone });
  }

  return transformResult;
}

module.exports = transformStateWithClones;
