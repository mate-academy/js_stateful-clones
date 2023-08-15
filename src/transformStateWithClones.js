'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        const { extraData } = action;

        stateCopy = {
          ...stateCopy, ...extraData,
        };
        break;

      case 'removeProperties':
        const { keysToRemove } = action;
        const newState = { ...stateCopy };

        for (const key of keysToRemove) {
          delete newState[key];
        }
        stateCopy = newState;
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
