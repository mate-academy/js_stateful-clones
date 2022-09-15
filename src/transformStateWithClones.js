'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const outputArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(stateCopy, action.extraData);
        break;

      case 'clear' :
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      case 'removeProperties' :
        for (const keys of action.keysToRemove) {
          delete stateCopy[keys];
        }
        break;

      default :
        throw Error;
    }
    outputArr.push({ ...stateCopy });
  }

  return outputArr;
}

module.exports = transformStateWithClones;
