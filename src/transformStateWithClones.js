'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const resultArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in cloneState) {
            delete cloneState[key];
          }
        }
        break;
      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;
      default:
        return ('Invalid action type:', action.type);
    }

    resultArray.push({ ...cloneState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
