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
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      currentState = Object.keys(currentState)
        .filter((key) => !action.keysToRemove.includes(key))
        .reduce((newState, key) => {
          newState[key] = currentState[key];

          return newState;
        }, {});
    }
    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
