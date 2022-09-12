'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateAfterActions = [];
  let copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'clear':
        copyState = {};
        break;

      case 'removeProperties':
        const arrKeysToRemove = action.keysToRemove;

        for (const key of arrKeysToRemove) {
          delete copyState[key];
        }
        break;

      default:
        return 'error';
    }

    stateAfterActions.push({ ...copyState });
  }

  return stateAfterActions;
}

module.exports = transformStateWithClones;
