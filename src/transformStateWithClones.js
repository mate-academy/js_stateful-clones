'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const statesAfterAction = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          stateCopy = { ...stateCopy, ...action.extraData };
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete stateCopy[key];
          }
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        // eslint-disable-next-line no-console
        console.error(`Unknown action type: ${action.type}`);
    }
    statesAfterAction.push({ ...stateCopy });
  }

  return statesAfterAction;
}

module.exports = transformStateWithClones;
