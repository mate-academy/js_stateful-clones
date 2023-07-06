'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClonesArray = [];
  let stateCopyObject = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopyObject, extraData);
        break;
      case 'removeProperties':
        keysToRemove.forEach((key) => delete stateCopyObject[key]);
        break;
      case 'clear':
        stateCopyObject = {};
        break;
      default:
        throw new Error('Ivalid data received');
    }

    stateClonesArray.push({ ...stateCopyObject });
  }

  return stateClonesArray;
}

module.exports = transformStateWithClones;
