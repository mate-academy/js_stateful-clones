'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalArray = [];
  let stateObject = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateObject, action.extraData);
        break;

      case 'removeProperties':
        for (const itemKeysToRemove of action.keysToRemove) {
          if (stateObject[itemKeysToRemove]) {
            delete stateObject[itemKeysToRemove];
          }
        }
        break;

      case 'clear':
        stateObject = {};
        break;
    }

    finalArray.push({ ...stateObject });
  }

  return finalArray;
}

module.exports = transformStateWithClones;
