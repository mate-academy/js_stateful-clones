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
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      const keysToRemove = new Set(action.keysToRemove);

      currentState = Object.fromEntries(
        Object.entries(currentState).filter(
          ([key, _]) => !keysToRemove.has(key),
        ),
      );
    }
    states.push({ ...currentState });
  });

  return states;
}

module.exports = transformStateWithClones;
