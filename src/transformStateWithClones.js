'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const historyOfState = [];
  let temporaryState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        temporaryState = {
          ...temporaryState,
          ...extraData,
        };
        break;

      case 'removeProperties':
        for (const property of keysToRemove) {
          delete temporaryState[property];
        }
        break;

      case 'clear':
        temporaryState = {};
        break;

      default:
        break;
    }

    historyOfState.push({ ...temporaryState });
  }

  return historyOfState;
}

module.exports = transformStateWithClones;
