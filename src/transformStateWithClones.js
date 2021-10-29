'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateProperties = [];
  const changedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const keyToAdd in action.extraData) {
          changedState[keyToAdd] = action.extraData[keyToAdd];
        }
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete changedState[keyToRemove];
        }
        break;

      case 'clear':
        for (const key in changedState) {
          delete changedState[key];
        }
        break;

      default: stateProperties.push('No actions done');
    }

    stateProperties.push({ ...changedState });
  }

  return stateProperties;
}

module.exports = transformStateWithClones;
