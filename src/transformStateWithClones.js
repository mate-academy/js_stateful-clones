'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyOfState = JSON.parse(JSON.stringify(state));
  const result = [];

  try {
    for (const action of actions) {
      switch (action['type']) {
        case 'addProperties':
          for (const fieldToAdd in action['extraData']) {
            copyOfState[fieldToAdd] = action['extraData'][fieldToAdd];
          };
          result.push(JSON.parse(JSON.stringify(copyOfState)));
          break;
        case 'removeProperties':
          for (const keyToRemove of action['keysToRemove']) {
            delete copyOfState[keyToRemove];
          };
          result.push(JSON.parse(JSON.stringify(copyOfState)));
          break;
        case 'clear':
          for (const field in copyOfState) {
            delete copyOfState[field];
          }
          result.push({});
          break;
      }
    }
  } catch (error) {
    throw new Error('Invalid operation');
  }

  return result;
}

module.exports = transformStateWithClones;
