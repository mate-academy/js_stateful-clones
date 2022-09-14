'use strict';

/**
 * @param {Object} newState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const stateClones = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      case 'removeProperties':
        for (const keysToRemove of action.keysToRemove) {
          delete newState[keysToRemove];
        }
        break;

      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      default:
        window.alert(`I don't know why I am here`);
    }

    stateClones.push(Object.assign({}, newState));
  }

  return stateClones;
}

module.exports = transformStateWithClones;
