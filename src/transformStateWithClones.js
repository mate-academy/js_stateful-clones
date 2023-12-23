/* eslint-disable no-console */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newObject = Object.assign({}, state);
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
        Object.assign(newObject, extraData);
        break;

      case remove:
        for (const key of keysToRemove) {
          if (newObject.hasOwnProperty(key)) {
            delete newObject[key];
          }
        }
        break;

      case clear:
        Object.keys(newObject).forEach(key => {
          delete newObject[key];
        });
        break;

      default:
        break;
    }
    result.push(Object.assign({}, newObject));
  }
  );

  return result;
}

module.exports = transformStateWithClones;
