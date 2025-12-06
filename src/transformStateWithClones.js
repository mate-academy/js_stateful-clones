'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let current = JSON.parse(JSON.stringify(state)); // deep clone

  for (const action of actions) {
    let nextState = JSON.parse(JSON.stringify(current)); // deep clone again

    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        nextState[key] = action.extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete nextState[key];
      }
    } else if (action.type === 'clear') {
      nextState = {};
    }

    history.push(nextState);

    current = nextState; // move forward
  }

  return history;
}

module.exports = transformStateWithClones;
