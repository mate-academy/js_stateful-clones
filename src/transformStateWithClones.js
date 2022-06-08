'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newObj = {
    ...state,
  };
  const newArray = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(newObj, extraData);

        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (newObj[key]) {
            delete newObj[key];
          }
        }

        break;

      case 'clear':
        newObj = {};

        break;

      default:
        return null;
    }

    newArray.push({ ...newObj });
  }

  return newArray;
}

module.exports = transformStateWithClones;
