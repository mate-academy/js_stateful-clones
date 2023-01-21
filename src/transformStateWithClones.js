'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyOfState = { ...state };
  const answerArray = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        copyOfState = Object.assign(copyOfState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete copyOfState[key];
        }
        break;

      case 'clear':
        for (const item in copyOfState) {
          delete copyOfState[item];
        }
        break;

      default:
        return answerArray;
    }
    answerArray.push({ ...copyOfState });
  }

  return answerArray;
}

module.exports = transformStateWithClones;
