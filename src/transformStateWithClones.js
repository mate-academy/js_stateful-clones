'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, action) {
  const stateAndAction = [];
  const copiedState = { ...state };

  for (const key of action) {
    switch (key.type) {
      case 'addProperties' :
        Object.assign(copiedState, key.extraData);
        break;

      case 'removeProperties' :
        for (let j = 0; j < key.keysToRemove.length; j++) {
          delete copiedState[key.keysToRemove[j]];
        }
        break;

      case 'clear' :
        for (const clear in copiedState) {
          delete copiedState[clear];
        }
        break;
    }
    stateAndAction.push({ ...copiedState });
  }

  return stateAndAction;
}

module.exports = transformStateWithClones;
