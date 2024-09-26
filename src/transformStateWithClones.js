'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const copyState = { ...state };

  for (const el of actions) {
    switch (el.type) {
      case 'addProperties':
        for (const keys in el.extraData) {
          copyState[keys] = el.extraData[keys];
        }
        break;

      case 'removeProperties':
        for (const keys of el.keysToRemove) {
          delete copyState[keys];
        }
        break;

      case 'clear':
        for (const keys in copyState) {
          delete copyState[keys];
        }
        break;

      default:
        break;
    }

    resultArray.push(Object.assign({}, copyState));
  }

  return resultArray;
}
module.exports = transformStateWithClones;
