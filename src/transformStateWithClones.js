'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [state];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    let newState;

    switch (type) {
      case 'addProperties':
        newState = { ...states[states.length - 1] };
        Object.assign(newState, extraData);
        break;
      case 'removeProperties':
        newState = { ...states[states.length - 1] };

        if (keysToRemove) {
          for (const key of keysToRemove) {
            delete newState[key];
          }
        }
        break;
      case 'clear':
        newState = {};
        break;
      default:
        throw new Error('Invalid action type');
    }

    states.push(newState);
  }

  return states.slice(1);
}

module.exports = transformStateWithClones;
