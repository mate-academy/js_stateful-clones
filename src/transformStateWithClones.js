'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newActions = [];
  let copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        newActions.push({ ...copyState });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        newActions.push({ ...copyState });
        break;
      case 'clear':
        copyState = {};
        newActions.push({ ...copyState });
        break;

      default:
        return null;
    }
  }

  return newActions;
}

module.exports = transformStateWithClones;
