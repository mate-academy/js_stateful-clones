'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionTypes = {
    addProperties: 'addProperties',
    removeProperties: 'removeProperties',
    clear: 'clear',
  };
  const stateCopy = { ...state };
  const statesArray = [];

  for (const action of actions) {
    switch (action.type) {
      case actionTypes.addProperties:
        Object.assign(stateCopy, action.extraData);
        break;

      case actionTypes.removeProperties:
        action.keysToRemove.forEach((key) => delete stateCopy[key]);
        break;

      case actionTypes.clear:
        Object.keys(stateCopy).forEach((key) => delete stateCopy[key]);
        break;

      default:
        break;
    }
    statesArray.push({ ...stateCopy });
  }

  return statesArray;
}

module.exports = transformStateWithClones;
