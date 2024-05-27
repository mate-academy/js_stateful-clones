'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arrayStates = [];

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(newState, key.extraData);
        break;

      case 'removeProperties':
        for (const action of key.keysToRemove) {
          delete newState[action];
        }
        break;

      case 'clear':
        newState = {};
        break;
    }
    arrayStates.push({ ...newState });
  }

  return arrayStates;
}

module.exports = transformStateWithClones;
