'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyOfState = { ...state };
  const stateAfterActions = [];

  for (const action of actions) {
    const {
      type,
      extraData,
      keysToRemove,
    } = action;

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
        copyOfState = {};
        break;

      default:
        return stateAfterActions;
    }
    stateAfterActions.push({ ...copyOfState });
  }

  return stateAfterActions;
}

module.exports = transformStateWithClones;
