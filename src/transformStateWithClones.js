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
    switch (action.type) {
      case 'addProperties': {
        const addData = action.extraData;

        for (const key in addData) {
          const addKey = key;

          stateCopy[addKey] = addData[key];
        }
        break;
      }

      case 'removeProperties': {
        const removeData = action.keysToRemove;

        for (const element of removeData) {
          delete stateCopy[element];
        }
        break;
      }

      case 'clear': {
        stateCopy = {};
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
