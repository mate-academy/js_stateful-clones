'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const addObject = { ...state };
  const finalArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(addObject, action.extraData);
        break;

      case 'removeProperties':
        for (const element of action.keysToRemove) {
          delete addObject[element];
        }
        break;

      case 'clear':
        for (const element in addObject) {
          delete addObject[element];
        }
        break;

      default:
        break;
    }
    finalArr.push({ ...addObject });
  }

  return finalArr;
}

module.exports = transformStateWithClones;
