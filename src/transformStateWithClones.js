'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newObject = { ...state };
  const resultOfFunction = [];

  // write code here
  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(newObject, action.extraData);
        break;

      case 'removeProperties' :
        for (const properties of action.keysToRemove) {
          delete newObject[properties];
        }
        break;

      case 'clear' :
        newObject = {};
        break;

      default:
        break;
    }
    resultOfFunction.push({ ...newObject });
  }

  return resultOfFunction;
}

module.exports = transformStateWithClones;
