'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyOfState = Object.assign({}, state);
  const resultArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const extraData = action.extraData;

        for (const item in extraData) {
          copyOfState[item] = extraData[item];
        }
        break;

      case 'removeProperties':
        const keysToRemove = action.keysToRemove;

        for (const key of keysToRemove) {
          if (copyOfState.hasOwnProperty(key)) {
            delete copyOfState[key];
          }
        }
        break;

      case 'clear':
        for (const elem in copyOfState) {
          delete copyOfState[elem];
        }
        break;

      default:
        break;
    }
    resultArray.push(Object.assign({}, copyOfState));
  }

  return resultArray;
}

module.exports = transformStateWithClones;
