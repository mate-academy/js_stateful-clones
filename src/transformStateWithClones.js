'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let prevState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    states.push(prevState);

    if (actions[i].type === 'addProperties') {
      for (const property in actions[i].extraData) {
        states[i][property] = actions[i].extraData[property];
      }
    }

    if (actions[i].type === 'removeProperties') {
      for (const property of actions[i].keysToRemove) {
        delete states[i][property];
      }
    }

    if (actions[i].type === 'clear') {
      states[i] = {};
    }

    prevState = { ...states[i] };
  }

  return states;
}

module.exports = transformStateWithClones;
