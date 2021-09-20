'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const newArray = [];

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        for (const key in act.extraData) {
          copyState[key] = act.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const k of act.keysToRemove) {
          delete copyState[k];
        }

        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;

      default:
        break;
    }

    newArray.push({ ...copyState });
  }

  return newArray;
}
module.exports = transformStateWithClones;
