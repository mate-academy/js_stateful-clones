'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalArray = [];
  const stateObject = Object.assign({}, state);

  for (const i of actions) {
    switch (i.type) {
      case 'addProperties':

        Object.assign(stateObject, i.extraData);

        finalArray.push({ ...stateObject });
        break;

      case 'removeProperties':
        for (const itemKeysToRemove of i.keysToRemove) {
          if (stateObject[itemKeysToRemove]) {
            delete stateObject[itemKeysToRemove];
          }
        }

        finalArray.push({ ...stateObject });
        break;

      case 'clear':
        for (const itemClearObject in stateObject) {
          delete stateObject[itemClearObject];
        }

        finalArray.push({ ...stateObject });
        break;
    }
  }

  return finalArray;
}

module.exports = transformStateWithClones;
