'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const workingState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        for (const line in workingState) {
          delete workingState[line];
        }
        break;

      case 'addProperties':
        for (const newProperty in extraData) {
          workingState[newProperty] = extraData[newProperty];
        }
        break;

      case 'removeProperties':
        for (const removingKey of keysToRemove) {
          delete workingState[removingKey];
        }
    }

    stateHistory.push({ ...workingState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
