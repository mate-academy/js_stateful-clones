'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformStateResult = [];
  const stateClone = { ...state };

  for (const action of actions) {
    if (action.hasOwnProperty('type') && action.type === 'clear') {
      const keys = Object.keys(stateClone);

      for (const key of keys) {
        delete stateClone[key];
      }
    }

    if (action.hasOwnProperty('type') && action.type === 'addProperties') {
      Object.assign(stateClone, action.extraData);
    }

    if (action.hasOwnProperty('type') && action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateClone[key];
      }
    }

    transformStateResult.push({ ...stateClone });
  }

  return transformStateResult;
}

module.exports = transformStateWithClones;
