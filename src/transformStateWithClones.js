'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resArray = [];
  const newState = {
    ...state,
  };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      case 'removeProperties':
        for (const propertries of action.keysToRemove) {
          if (propertries in newState) {
            delete newState[propertries];
          }
        }
        break;

      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      default:
        break;
    }
    resArray.push({ ...newState });
  }

  return resArray;
}

module.exports = transformStateWithClones;
