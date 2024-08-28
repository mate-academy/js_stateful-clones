'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const tempState = { ...state };
  const statesArr = [];
  let tempObjChanges = {};

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        tempObjChanges = action.extraData;

        for (const key in tempObjChanges) {
          tempState[key] = tempObjChanges[key];
        }

        break;
      }

      case 'removeProperties': {
        tempObjChanges = action.keysToRemove;

        for (const rem of tempObjChanges) {
          delete tempState[rem];
        }

        break;
      }

      case 'clear': {
        for (const key in tempState) {
          delete tempState[key];
        }

        break;
      }

      default:
        return {};
    }

    statesArr.push({ ...tempState });
  }

  return statesArr;
}

module.exports = transformStateWithClones;
