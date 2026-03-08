'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = JSON.parse(JSON.stringify(state));
  const result = [];

  for (const action of actions) {
    let newState;

    if (action.type === 'clear') {
      newState = {};
    } else if (action.type === 'addProperties') {
      newState = JSON.parse(JSON.stringify(currentState));
      Object.assign(newState, action.extraData);
    } else if (action.type === 'removeProperties') {
      newState = JSON.parse(JSON.stringify(currentState));

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    }
    result.push(newState);
    currentState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;
