'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, action) {
  const listOfStateAndAction = [];
  const copyedState = { ...state };

  for (const key of action) {
    switch (key.type) {
      case 'addProperties' :
        Object.assign(copyedState, key.extraData);
        break;

      case 'removeProperties' :
        for (let j = 0; j < key.keysToRemove.length; j++) {
          delete copyedState[key.keysToRemove[j]];
        }
        break;

      case 'clear' :
        for (const clear in copyedState) {
          delete copyedState[clear];
        }
        break;
    }
    listOfStateAndAction.push({ ...copyedState });
  }

  return listOfStateAndAction;
}

module.exports = transformStateWithClones;
