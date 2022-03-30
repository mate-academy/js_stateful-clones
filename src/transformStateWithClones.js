'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const currentState = { ...state };
  const stateChangesArr = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        const { extraData } = actions[i];

        Object.assign(currentState, extraData);
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;
    }
    stateChangesArr[i] = Object.assign({}, currentState);
  }

  return stateChangesArr;
}

module.exports = transformStateWithClones;
