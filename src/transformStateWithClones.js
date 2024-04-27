'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clonedState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(clonedState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete clonedState[key];
        }
        break;

      case 'clear':
        clonedState = {};
        break;
    }

    stateHistory.push({ ...clonedState });
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
