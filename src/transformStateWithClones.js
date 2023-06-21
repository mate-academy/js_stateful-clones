'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          stateCopy[key] = extraData[key];
        }
        break;

      case 'removeProperties':
        keysToRemove.forEach(key => {
          if (key in stateCopy) {
            delete stateCopy[key];
          }
        });
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error(`type in array 'actions' is not found`);
    }
    array.push({ ...stateCopy });
  }

  return array;
}

module.exports = transformStateWithClones;
