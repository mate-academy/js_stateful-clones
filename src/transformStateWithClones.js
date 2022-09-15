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
    switch (action.type) {
      case 'addProperties':
        const additionalObj = action['extraData'];

        for (const objKey in additionalObj) {
          stateClone[objKey] = additionalObj[objKey];
        }
        break;

      case 'removeProperties':
        const arr = action['keysToRemove'];

        for (const arrElem of arr) {
          delete stateClone[arrElem];
        }
        break;

      case 'clear':
        for (const stateKey in stateClone) {
          delete stateClone[stateKey];
        }
        break;
    }

    stateWithClones.push({ ...stateClone });
  }

  return stateWithClones;
}

module.exports = transformStateWithClones;
