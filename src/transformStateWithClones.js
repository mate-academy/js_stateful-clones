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

    const newState = { ...states[states.length - 1] };

    if (type === 'addProperties') {
      Object.assign(newState, extraData);
    } else if (type === 'removeProperties') {
      if (keysToRemove) {
        for (const key of keysToRemove) {
          delete newState[key];
        }
      }
    } else if (type === 'clear') {
      Object.keys(newState).forEach((key) => delete newState[key]);
    }

    states.push(newState);
  }

  return states.slice(1);
}

module.exports = transformStateWithClones;
