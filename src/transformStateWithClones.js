'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stageState = [];
  const stateClone = { ...state };

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(stateClone, obj.extraData);
    }

    if (obj.type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }

    if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete stateClone[key];
      }
    }

    stageState.push({ ...stateClone });
  }

  return stageState;
}

module.exports = transformStateWithClones;
