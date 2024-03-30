'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (true) {
      case action.type === 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case action.type === 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete newState[keyToRemove];
        }
        break;

      case action.type === 'clear':
        newState = {};
        break;
    }

    arr.push({ ...newState });
  }

  return arr;
}

module.exports = transformStateWithClones;
