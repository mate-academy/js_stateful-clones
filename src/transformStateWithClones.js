'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];

  let prevState = { ...state };

  for (const action of actions) {
    let nextState = { ...prevState };

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = { ...prevState, ...(action.extraData || {}) };
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete nextState[key];
          }
        }
        break;

      default:
        break;
    }

    history.push(nextState);

    prevState = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;
