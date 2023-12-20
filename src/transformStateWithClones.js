/* eslint-disable no-console */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newObject = { ...state };
  const result = [];
  const ACTION_CASES = {
    add: 'addProperties',
    remove: 'removeProperties',
    clear: 'clear',
  };

  actions.forEach(({ type, extraData, keysToRemove }) => {
    const { add, remove, clear } = ACTION_CASES;

    switch (type) {
      case add:
        newObject = {
          ...newObject,
          ...extraData,
        };

        break;

      case remove:
        for (const key of keysToRemove) {
          if (newObject.hasOwnProperty(key)) {
            delete newObject[key];
          }
        }
        break;

      case clear:
        newObject = {};
        break;

      default:
        break;
    }
    result.push({ ...newObject });
  }
  );

  return result;
}

module.exports = transformStateWithClones;
