'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const copyOfState = JSON.parse(JSON.stringify(state));

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const item in action.extraData) {
          copyOfState[item] = action.extraData[item];
        }
        break;

      case 'removeProperties':
        for (const item of action.keysToRemove) {
          delete copyOfState[item];
        }
        break;

      case 'clear':
        for (const item in copyOfState) {
          delete copyOfState[item];
        }
        break;

      default:
        return '';
    }
    resultArray.push({ ...copyOfState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
