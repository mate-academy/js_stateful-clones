'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateWithClones = [];

  for (const action of actions) {
    if (action['type'] === 'addProperties') {
      const additionalObj = action['extraData'];

      for (const objKey in additionalObj) {
        stateClone[objKey] = additionalObj[objKey];
      }
    }

    if (action['type'] === 'removeProperties') {
      const arr = action['keysToRemove'];

      for (const arrElem of arr) {
        delete stateClone[arrElem];
      }
    }

    if (action['type'] === 'clear') {
      for (const stateKey in stateClone) {
        delete stateClone[stateKey];
      }
    }

    stateWithClones.push({ ...stateClone });
  }

  return stateWithClones;
}

module.exports = transformStateWithClones;
