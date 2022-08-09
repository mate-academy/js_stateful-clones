'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];

  for (let i = 0; i < actions.length; i++) {
    if (i === 0) {
      states.push({ ...state });
    } else {
      states.push({ ...states[i - 1] });
    }

    switch (actions[i][`type`]) {
      case 'addProperties':
        for (const property in actions[i][`extraData`]) {
          states[i][property] = actions[i][`extraData`][property];
        }
        break;

      case 'removeProperties':
        for (const property in actions[i][`keysToRemove`]) {
          if (Object.keys(states[i]).includes(actions[i][`keysToRemove`][property])) {
            delete states[i][actions[i][`keysToRemove`][property]];
          }
        }
        break;

      case 'clear':
        for (const stateKey in states[i]) {
          delete states[i][stateKey];
        }
        break;

      default:
        break;
    }
  }

  return states;
}

module.exports = transformStateWithClones;
