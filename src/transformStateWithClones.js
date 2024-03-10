'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateHisoryClone = [];

  for (const obj of actions) {
    for (const key in obj) {
      if (key === 'extraData') {
        for (const addProperty in obj[key]) {
          stateClone[addProperty] = obj[key][addProperty];
        }

        stateHisoryClone.push({ ...stateClone });
      }

      if (key === 'keysToRemove') {
        for (const removeProperty of obj[key]) {
          delete stateClone[removeProperty];
        }

        stateHisoryClone.push({ ...stateClone });
      }

      if (obj[key] === 'clear') {
        for (const removeKey in stateClone) {
          delete stateClone[removeKey];
        }

        stateHisoryClone.push({ ...stateClone });
      }
    }
  }

  return stateHisoryClone;
}

module.exports = transformStateWithClones;
