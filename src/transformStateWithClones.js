'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  const tempState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(tempState, extraData);
        break;
      case 'removeProperties':
        keysToRemove.forEach(key => {
          delete tempState[key];
        });
        break;
      case 'clear':
        for (const key in tempState) {
          delete tempState[key];
        }
        break;
      default:
        break; ;
    }

    result.push({ ...tempState });
  }

  return result;
}

module.exports = transformStateWithClones;
