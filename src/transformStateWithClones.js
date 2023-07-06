'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClonesArray = [];
  const stateCopyObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopyObject, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete stateCopyObject[key]);
        break;
      case 'clear':
        Object.keys(stateCopyObject).forEach(
          (key) => delete stateCopyObject[key]
        );
        break;
    }

    stateClonesArray.push({ ...stateCopyObject });
  }

  return stateClonesArray;
}

module.exports = transformStateWithClones;
