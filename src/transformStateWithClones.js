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
  let stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    const { add, remove, clear } = ACTION_TYPES;

    switch (type) {
      case add:
        stateCopy = {
          ...stateCopy,
          ...extraData,
        };
        break;

      case remove:
        for (const key of keysToRemove) {
          if (stateCopy.hasOwnProperty(key)) {
            delete stateCopy[key];
          }
        }
        break;

      case clear:
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
