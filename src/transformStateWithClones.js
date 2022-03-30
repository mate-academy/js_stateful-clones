'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithstateCopys(state, actions) {
  const result = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        const { extraData } = action;

        Object.assign(stateCopy, extraData);

        break;
      }

      case 'removeProperties': {
        const { keysToRemove } = action;

        for (const key in stateCopy) {
          if (keysToRemove.includes(key)) {
            delete stateCopy[key];
          }
        }

        break;
      }

      case 'clear': {
        for (const key in stateCopy) {
          delete stateCopy[key];
        }

        break;
      }
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithstateCopys;
