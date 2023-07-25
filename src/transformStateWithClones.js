'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actualState = { ...state };
  const statesArr = [];

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(actualState, key.extraData);
        break;

      case 'removeProperties':
        key.keysToRemove.forEach(el => delete actualState[el]);
        break;

      case 'clear':
        Object.keys(actualState).forEach(el => delete actualState[el]);
        break;

      default:
        throw new Error('Error! Please check input data!');
    }
    statesArr.push({ ...actualState });
  }

  return statesArr;
}

module.exports = transformStateWithClones;
