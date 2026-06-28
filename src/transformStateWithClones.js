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

        result.push({ ...stateCopy });

        break;
      }

      case 'removeProperties': {
        const removeData = action.keysToRemove;

        for (const element of removeData) {
          delete stateCopy[element];
        }

        result.push({ ...stateCopy });

        break;
      }

      case 'clear': {
        stateCopy = {};

        result.push({ ...stateCopy });

        break;
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
