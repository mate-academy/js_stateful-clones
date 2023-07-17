'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const resultArray = [];
  const actionTypes = {
    AddProperties: 'addProperties',
    RemoveProperties: 'removeProperties',
    Clear: 'clear',
  };

  for (const action of actions) {
    switch (action.type) {
      case actionTypes.AddProperties:
        Object.assign(stateClone, action.extraData);
        break;

      case actionTypes.RemoveProperties:
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;

      case actionTypes.Clear:
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      default:
        break;
    }

    resultArray.push({ ...stateClone });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
