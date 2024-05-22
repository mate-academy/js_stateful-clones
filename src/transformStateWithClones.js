'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = { ...state };

  actions.forEach((action) => {
    const nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      case 'clear':
        for (const key in nextState) {
          delete nextState[key];
        }
        break;

      default:
        break;
    }

    states.push(nextState);
    currentState = { ...nextState };
  });

  return states;
}

module.exports = transformStateWithClones;
