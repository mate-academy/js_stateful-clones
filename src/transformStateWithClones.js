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

        result.push({ ...newObject });
        break;

      case 'removeProperties':
        for (const key of element.keysToRemove) {
          if (newObject.hasOwnProperty(key)) {
            delete newObject[key];
          }
        }
        result.push({ ...newObject });
        break;

      case 'clear':
        newObject = {};
        result.push(newObject);
        break;

      default:
        break;
    }
  });

  console.log(result);

  return result;
}

module.exports = transformStateWithClones;
