'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const lastArr = [];
  const objCopy = {
    ...state,
  };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(objCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete objCopy[key];
        }
        break;

      case 'clear':
        for (const key in objCopy) {
          delete objCopy[key];
        }
        break;

      default:
        throw new Error('This type doesn`t exist');
    }

    lastArr.push({ ...objCopy });
  }

  return lastArr;
}

module.exports = transformStateWithClones;
