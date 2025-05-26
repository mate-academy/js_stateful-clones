'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';

  const stateHystory = [];
  let stateClone = { ...state };

  for (const obj of actions) {
    if (obj.type === ADD_PROPERTIES) {
      for (const key in obj.extraData) {
        stateClone[key] = obj.extraData[key];
      }
    }

    if (obj.type === REMOVE_PROPERTIES) {
      for (const key of obj.keysToRemove) {
        delete stateClone[key];
      }
    }

    if (obj.type === CLEAR) {
      for (const v in stateClone) {
        delete stateClone[v];
      }
    }
    stateHystory.push({ ...stateClone });
    stateClone = { ...stateClone };
  }

  return stateHystory;
}

module.exports = transformStateWithClones;
