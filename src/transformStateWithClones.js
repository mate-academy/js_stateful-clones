'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [Object.assign({}, state)];

  actions.forEach((action) => {
    const lastState = states[states.length - 1];
    const newState = Object.assign({}, lastState);

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;

      case 'clear':
        Object.keys(newState).forEach((key) => {
          delete newState[key];
        });
        break;

      default:
        break;
    }

    states.push(newState);
  });

  return states.slice(1);
}

module.exports = transformStateWithClones;
