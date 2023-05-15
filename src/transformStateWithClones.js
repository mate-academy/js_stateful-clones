'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedState = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clonedState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in clonedState) {
            delete clonedState[key];
          }
        }
        break;

      case 'clear':
        for (const key in clonedState) {
          delete clonedState[key];
        }
        break;

      default:
        return (`Invalid action type: ${action.type}`);
    }

    stateVersions.push({ ...clonedState });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
