'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };

  const results = [];

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case 'addProperties':
        nextState = {
          ...newState,
          ...(action.extraData || {}),
        };

        break;
      case 'removeProperties':
        nextState = { ...newState };

        if (action.keysToRemove && Array.isArray(action.keysToRemove)) {
          for (const keydel of action.keysToRemove) {
            delete nextState[keydel];
          }
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        nextState = { ...newState };
        break;
    }
    results.push(nextState);
    newState = nextState;
  }

  return results;
}

module.exports = transformStateWithClones;
