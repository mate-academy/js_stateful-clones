'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const storage = [];
  const modifiedState = {};

  for (const copy in state) {
    modifiedState[copy] = state[copy];
  }

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(modifiedState, action.extraData);
        break;

      case 'removeProperties':
        for (const keysToRemove of action.keysToRemove) {
          delete modifiedState[keysToRemove];
        }
        break;

      case 'clear':
        for (const key in modifiedState) {
          delete modifiedState[key];
        }
        break;
    }
    storage.push({...modifiedState})
  }

  return storage;
}

module.exports = transformStateWithClones;
