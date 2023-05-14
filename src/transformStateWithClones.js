'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const allPreviousVersionsOfState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        copyState = {
          ...copyState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const trash of action.keysToRemove) {
          delete copyState[trash];
        }
        break;

      case 'clear':
        for (const key1 in copyState) {
          delete copyState[key1];
        }
        break;

      default:
        break;
    }

    allPreviousVersionsOfState.push({ ...copyState });
  }

  return allPreviousVersionsOfState;
}

module.exports = transformStateWithClones;
