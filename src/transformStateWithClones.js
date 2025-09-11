'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prevState = { ...state };
  const states = [];

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = { ...prevState, ...(action.extraData || {}) };
        break;

      case 'removeProperties':
        newState = { ...prevState };

        for (const key of action.keysToRemove || []) {
          delete newState[key];
        }
        break;

      default:
        newState = { ...prevState };
        break;
    }

    states.push(newState);
    prevState = newState;
  }

  return states;
}

module.exports = transformStateWithClones;
