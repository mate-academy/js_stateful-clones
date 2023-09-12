'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = [];
  const stateClone = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      case 'addProperties': {
        for (const data in extraData) {
          stateClone[data] = extraData[data];
        }
        break;
      }

      case 'removeProperties': {
        for (const item in keysToRemove) {
          delete stateClone[keysToRemove[item]];
        }
        break;
      }
    }
    clone.push({ ...stateClone });
  }

  return clone;
}

module.exports = transformStateWithClones;
