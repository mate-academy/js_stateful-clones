'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const versions = [];
  const currentState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete currentState[prop];
        }
        break;

      case 'clear':
        for (const prop in currentState) {
          delete currentState[prop];
        }
        break;

      default: break;
    }

    versions.push(Object.assign({}, currentState));
  }

  return versions;
}

module.exports = transformStateWithClones;
