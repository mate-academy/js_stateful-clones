'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const states = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...extraData };
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }

    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
