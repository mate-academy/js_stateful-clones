'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];

  for (const action of actions) {
    let stateCopy = {};

    if (states.length === 0) {
      stateCopy = { ...state };
    } else {
      stateCopy = { ...states[states.length - 1] };
    }

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateCopy[keyToRemove];
        }
        break;

      case 'clear':
        for (const keyToRemove of Object.keys(stateCopy)) {
          delete stateCopy[keyToRemove];
        }
        break;

      default:
        break;
    }

    states.push(stateCopy);
  }

  return states;
}

module.exports = transformStateWithClones;
