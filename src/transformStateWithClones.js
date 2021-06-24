'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let previousState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    states.push(previousState);

    switch (actions[i].type) {
      case 'addProperties':
        for (const property in actions[i].extraData) {
          states[i][property] = actions[i].extraData[property];
        }
        break;

      case 'removeProperties':
        for (const property of actions[i].keysToRemove) {
          delete states[i][property];
        }
        break;

      case 'clear':
        states[i] = {};
        break;
    }

    previousState = { ...states[i] };
  }

  return states;
}

module.exports = transformStateWithClones;
