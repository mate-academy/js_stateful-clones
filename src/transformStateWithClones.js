'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties': {
        Object.assign(stateCopy, actions[i].extraData);
        result.push({ ...stateCopy });
        break;
      }

      case 'removeProperties': {
        for (const key of actions[i].keysToRemove) {
          delete stateCopy[key];
        }
        result.push({ ...stateCopy });
        break;
      }

      case 'clear': {
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        result.push({ ...stateCopy });
        break;
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
