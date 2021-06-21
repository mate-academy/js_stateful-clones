'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newStates = [];
  const copiedState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(copiedState, actions[i].extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of actions[i].keysToRemove) {
          delete copiedState[keyToRemove];
        }
        break;
      case 'clear':
        for (const key in copiedState) {
          delete copiedState[key];
        }
        break;
    }
    newStates.push({ ...copiedState });
  }

  return newStates;
}

module.exports = transformStateWithClones;
