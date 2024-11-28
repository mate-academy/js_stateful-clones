'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          newState[key] = extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        const arrKeys = Object.keys(newState);

        for (const key of arrKeys) {
          delete newState[key];
        }
        break;
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
