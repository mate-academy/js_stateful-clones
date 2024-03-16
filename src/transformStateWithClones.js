'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copiedStateObject = { ...state };
  const newState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':

        Object.assign(copiedStateObject, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copiedStateObject[key];
        }
        break;

      case 'clear':
        for (const value in copiedStateObject) {
          delete copiedStateObject[value];
        }
        break;
    }

    newState.push({ ...copiedStateObject });
  }

  return newState;
}

module.exports = transformStateWithClones;
