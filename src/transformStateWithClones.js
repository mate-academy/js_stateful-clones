'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      currentState = Object.fromEntries(
        Object.entries(currentState).filter(
          ([key]) => !action.keysToRemove.includes(key),
        ),
      );
    } else if (action.type === 'clear') {
      currentState = {};
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
