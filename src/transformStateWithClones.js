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

  actions.forEach(element => {
    switch (element.type) {
      case ACTION_CASES.add:
        newObject = {
          ...newObject,
          ...element.extraData,
        };

        break;

      case ACTION_CASES.remove:
        for (const key of element.keysToRemove) {
          if (newObject.hasOwnProperty(key)) {
            delete newObject[key];
          }
        }
        break;

      case ACTION_CASES.clear:
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
