'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const versions = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        versions.push(currentState);
        break;

      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        versions.push(currentState);
        break;

      case 'clear':
        currentState = { ...currentState };

        for (const key in currentState) {
          delete currentState[key];
        }
        versions.push(currentState);
        break;

      case 'default':
        throw new Error(`No ${action.type} action type found`);
    }
  }

  return versions;
}

module.exports = transformStateWithClones;
