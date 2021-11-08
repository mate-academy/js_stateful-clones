'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [{ ...state }];

  actions.forEach((action, i) => {
    let currentState = { ...states[i] };

    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => delete currentState[key]);
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error('Performing unknown action');
    }

    states.push(currentState);
  });

  return states.slice(1);
}

module.exports = transformStateWithClones;
