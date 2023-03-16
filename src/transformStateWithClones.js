'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function makeDeepCloneJSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function transformStateWithClones(state, actions) {
  const copyOfState = makeDeepCloneJSON(state);
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyOfState, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete copyOfState[keyToRemove];
        };
        break;

      case 'clear':
        for (const field in copyOfState) {
          delete copyOfState[field];
        }
        break;

      default:
        throw new Error('Invalid operation');
    }
    states.push(makeDeepCloneJSON(copyOfState));
  }

  return states;
}

module.exports = transformStateWithClones;
