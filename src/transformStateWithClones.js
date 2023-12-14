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

  actions.forEach(element => {
    switch (element.type) {
      case 'addProperties':
        newObject = {
          ...newObject,
          ...element.extraData,
        };

        break;

      case 'removeProperties':
        for (const key of element.keysToRemove) {
          if (newObject.hasOwnProperty(key)) {
            delete newObject[key];
          }
        }
        break;

      case 'clear':
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
