'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copiedState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copiedState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete copiedState[key];
        }
        break;

      case 'clear':
        for (const key in copiedState) {
          delete copiedState[key];
        }
        break;
    }

    result.push({ ...copiedState });
  }

  return result;
}

module.exports = transformStateWithClones;
