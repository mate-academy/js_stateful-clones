'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateClone = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateClone[key];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    }

    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
