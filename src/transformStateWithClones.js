'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyOfState = { ...state };
  const states = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          copyOfState[key] = actions[i].extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          if (copyOfState.hasOwnProperty(key)) {
            delete copyOfState[key];
          }
        }
        break;

      case 'clear':
        if (Object.keys(copyOfState).length !== 0) {
          for (const key in copyOfState) {
            delete copyOfState[key];
          }
        }
        break;

      default:
        return 0;
    }

    states.push({ ...copyOfState });
  }

  return states;
}

module.exports = transformStateWithClones;
