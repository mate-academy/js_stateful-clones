'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];

  states.push(Object.assign({}, state));

  let lastState = 0;

  for (const action of actions) {
    let previousState = Object.assign({}, states[lastState]);

    if (action.type === 'addProperties') {
      for (const [key, value] of Object.entries(action.extraData)) {
        previousState[key] = value;
      }
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        if (previousState[key]) {
          delete previousState[key];
        }
      }
    } else {
      previousState = {};
    }
    states.push(previousState);
    lastState++;
  }

  return states.slice(1);
}

module.exports = transformStateWithClones;
