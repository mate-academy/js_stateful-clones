'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = {};
  const result = [];

  for (const key in state) {
    stateCopy[key] = state[key];
  }

  for (let i = 0; i < actions.length; i++) {
    const typeKey = actions[i].type;
    const extraDataKey = actions[i].extraData;
    const removeKeys = actions[i].keysToRemove;

    switch (typeKey) {
      case 'addProperties':
        Object.assign(stateCopy, extraDataKey);
        break;

      case 'removeProperties':
        for (let x = 0; x < removeKeys.length; x++) {
          delete stateCopy[removeKeys[x]];
        };
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        };
        break;

      default:
        break;
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
