'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clon = [];
  let newState = {
    ...state,
  };

  for (const action of actions) {
    newState = {
      ...newState,
    };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      default:
        throw new Error('action is not supported');
    }
    clon.push(newState);
  }

  return clon;
}

module.exports = transformStateWithClones;
