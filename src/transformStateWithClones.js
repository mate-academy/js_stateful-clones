'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function cloneObject(obj) {
  return Object.assign({}, obj);
}

function transformStateWithClones(state, actions) {
  // write code here
  const cloneStates = [cloneObject(state)];

  for (const action of actions) {
    const newState = cloneObject(cloneStates[cloneStates.length - 1]);

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete newState[keyToRemove];
        }
        break;

      case 'clear':
        for (const key of Object.keys(newState)) {
          delete newState[key];
        }
        break;

      default:

        break;
    }
    cloneStates.push(newState);
  }

  return cloneStates.slice(1);
}

module.exports = transformStateWithClones;
