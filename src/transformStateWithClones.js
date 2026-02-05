/* eslint-disable prettier/prettier */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const results = [];

  for (const action of actions) {
    Object.assign(stateClone, action.extraData);

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateClone[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }

    results.push({ ...stateClone });
  }

  return results;
}

module.exports = transformStateWithClones;
