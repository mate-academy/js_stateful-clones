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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newObj, action.extraData);

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
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
