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
    switch (true) {
      case actions[i].type === 'addProperties':
        const { extraData } = actions[i];

        Object.assign(currentState, extraData);
        stateChangesArr[i] = Object.assign({}, currentState);
        break;

      case actions[i].type === 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete currentState[key];
        }
        stateChangesArr[i] = Object.assign({}, currentState);
        break;

      case actions[i].type === 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        stateChangesArr[i] = Object.assign({}, currentState);
        break;
    }
  }

  return stateChangesArr;
}

module.exports = transformStateWithClones;
