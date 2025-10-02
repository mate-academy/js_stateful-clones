'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let nextState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        nextState = { ...nextState, ...action.extraData };
        break;

      case 'removeProperties':
        nextState = { ...nextState };

        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete nextState[key];
          }
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push({ ...nextState });
  }

  return history;
}

module.exports = transformStateWithClones;
