'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ACTION_TYPES = {
    add: 'addProperties',
    remove: 'removeProperties',
    clear: 'clear',
  };
  const result = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    const { add, remove, clear } = ACTION_TYPES;

    switch (type) {
      case add:
        Object.assign(stateCopy, extraData);
        break;

      case remove:
        for (const key of keysToRemove) {
          if (stateCopy.hasOwnProperty(key)) {
            delete stateCopy[key];
          }
        }
        break;

      case clear:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        break;
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
