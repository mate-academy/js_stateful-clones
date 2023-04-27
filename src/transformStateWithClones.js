'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  let oldState = { ...state };

  for (const action of actions) {
    const newState = { ...oldState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        array.push(newState);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        array.push(newState);
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        array.push(newState);
        break;

      default:
        // do nothing for unknown action types
        break;
    }
    oldState = newState;
  }

  return array;
}

module.exports = transformStateWithClones;
