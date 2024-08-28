'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let stateCopy = null;

  for (const action of actions) {
    if (states.length === 0) {
      stateCopy = { ...state };
    } else {
      stateCopy = { ...states[states.length - 1] };
    }

    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      default:
        return 'Error';
    }

    states.push(stateCopy);
  }

  return states;
}

module.exports = transformStateWithClones;
