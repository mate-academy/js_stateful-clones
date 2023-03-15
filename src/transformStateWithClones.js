'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const cloneActions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const extraData = action.extraData;

        Object.assign(cloneState, extraData);
        break;

      case 'removeProperties':
        const keysToRemove = action.keysToRemove;

        for (const value of keysToRemove) {
          if (cloneState.hasOwnProperty(value)) {
            delete cloneState[value];
          }
        }
        break;

      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;

      default:
        throw new Error('Invalid action type');
    }
    cloneActions.push({ ...cloneState });
  }

  return cloneActions;
}

module.exports = transformStateWithClones;
