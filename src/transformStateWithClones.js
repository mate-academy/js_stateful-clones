'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopyList = [];

  for (const oneAction of actions) {
    const { type, extraData, keysToRemove } = oneAction;
    const stateCopy =
      stateCopyList[0] === undefined
        ? { ...state }
        : { ...stateCopyList[stateCopyList.length - 1] };

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;
      case 'removeProperties':
        keysToRemove.forEach((key) => delete stateCopy[key]);
        break;
      case 'clear':
        Object.keys(stateCopy).forEach((key) => delete stateCopy[key]);
        break;
      default:
        Object.keys(stateCopy).forEach((key) => delete stateCopy[key]);
        Object.assign(stateCopy, { error: `${type} is not available.` });
    }

    stateCopyList.push(stateCopy);
  }

  return stateCopyList;
}

module.exports = transformStateWithClones;
