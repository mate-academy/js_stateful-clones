'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };

  const versions = [];

  for (const action of actions) {
    currentState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;

      case 'default':
        throw new Error(`No ${action.type} action type found`);
    }

    versions.push(currentState);
  }

  return versions;
}

module.exports = transformStateWithClones;
