'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let currentState = structuredClone(state);
  const history = [];

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      currentState = Object.fromEntries(
        Object.entries(currentState).filter(
          ([key]) => !action.keysToRemove.includes(key),
        ),
      );
    } else if (action.type === 'clear') {
      currentState = {}; // Clear state by reassigning an empty object
    }

    history.push(structuredClone(currentState));
  });

  return history;
}

module.exports = transformStateWithClones;
