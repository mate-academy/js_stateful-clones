'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = {
    ...state,
  };

  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        for (const el of action.keysToRemove) {
          delete stateCopy[el];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default: {
        break;
      }
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
