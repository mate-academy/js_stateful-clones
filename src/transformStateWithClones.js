'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArry = [];
  const newObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newObject, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete newObject[keyToRemove];
        }
        break;

      case 'clear':
        for (const clear in newObject) {
          delete newObject[clear];
        }
        break;
    }

    newArry.push({ ...newObject });
  }

  return newArry;
}

module.exports = transformStateWithClones;
