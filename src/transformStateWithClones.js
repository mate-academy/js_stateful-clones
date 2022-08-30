'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArray = [];
  let newObject = { ...state };

  for (const oneAction of actions) {
    switch (oneAction.type) {
      case 'addProperties':
        Object.assign(newObject, oneAction.extraData);
        break;

      case 'removeProperties':
        for (const arr of oneAction.keysToRemove) {
          delete newObject[arr];
        }
        break;

      case 'clear':
        newObject = {};
        break;
    }

    newArray.push({ ...newObject });
  }

  return newArray;
}

module.exports = transformStateWithClones;
