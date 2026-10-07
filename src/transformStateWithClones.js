'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear': {
        stateCopy = {};
        break;
      }

      case 'addProperties': {
        stateCopy = { ...stateCopy, ...action.extraData };
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          const { [key]: removed, ...rest } = stateCopy;

          stateCopy = rest;
        }
        break;
      }

      default: {
        throw new Error(`Unknown action type: ${action.type}`);
      }
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
