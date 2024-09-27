'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];

  actions.forEach((action) => {
    const previousState =
      states.length > 0 ? states[states.length - 1] : { ...state };
    let newState = { ...previousState };

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;

      default:
        break;
    }

    states.push(newState);
  });

  return states;
}

module.exports = transformStateWithClones;
