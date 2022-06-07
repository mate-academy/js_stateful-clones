'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneOfState = { ...state };
  const cloneOfStateArr = [];

  for (const keyForActions of actions) {
    const { type, extraData, keysToRemove } = keyForActions;

    switch (type) {
      case 'addProperties':
        Object.assign(cloneOfState, extraData);
        break;

      case 'removeProperties':
        for (const toBeRemoved of keysToRemove) {
          delete cloneOfState[toBeRemoved];
        }
        break;

      case 'clear':
        cloneOfState = {};
        break;

      default:
        break;
    }
    cloneOfStateArr.push({ ...cloneOfState });
  }

  return cloneOfStateArr;
}

module.exports = transformStateWithClones;
