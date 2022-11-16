'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const stateCopyArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const removeKey of action.keysToRemove) {
          delete stateCopy[removeKey];
        }
        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      default:
        break;
    }

    stateCopyArray.push(stateCopy);
    stateCopy = { ...stateCopyArray[stateCopyArray.length - 1] };
  }

  return stateCopyArray;
}

module.exports = transformStateWithClones;
