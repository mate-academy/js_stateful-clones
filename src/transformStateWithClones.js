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

        const addObject = { ...stateObject };

        finalArray.push(addObject);
        break;

      case 'removeProperties':
        for (const itemKeysToRemove of i.keysToRemove) {
          for (const itemStateObject in stateObject) {
            if (itemStateObject === itemKeysToRemove) {
              delete stateObject[itemStateObject];
            }
          }
        }

        const removeObject = { ...stateObject };

        finalArray.push(removeObject);
        break;

      case 'clear':
        for (const itemClearObject in stateObject) {
          delete stateObject[itemClearObject];
        }

        const clearObject = { ...stateObject };

        finalArray.push(clearObject);
        break;
    }
  }

  return finalArray;
}

module.exports = transformStateWithClones;
