'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = {
    ...state,
  };
  const result = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(copyState, extraData);

        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (copyState[key]) {
            delete copyState[key];
          }
        }

        break;

      case 'clear':
        copyState = {};

        break;

      default:
        break;
    }

    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
