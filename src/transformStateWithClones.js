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
    switch (action['type']) {
      case 'addProperties':
        for (const fieldToAdd in action['extraData']) {
          copyOfState[fieldToAdd] = action['extraData'][fieldToAdd];
        };
        states.push(makeDeepCloneJSON(copyOfState));
        break;
      case 'removeProperties':
        for (const keyToRemove of action['keysToRemove']) {
          delete copyOfState[keyToRemove];
        };
        states.push((makeDeepCloneJSON(copyOfState)));
        break;
      case 'clear':
        for (const field in copyOfState) {
          delete copyOfState[field];
        }
        states.push({});
        break;
      default:
        throw new Error('Invalid operation');
    }
  }

  return states;
}

module.exports = transformStateWithClones;
