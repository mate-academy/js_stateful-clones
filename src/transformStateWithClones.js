'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneOfState = [];
  const copyOfState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(copyOfState, actions[i].extraData);
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete copyOfState[key];
        }
        break;

      case 'clear':
        for (const key in copyOfState) {
          delete copyOfState[key];
        }
        break;
    }

    cloneOfState.push({ ...copyOfState });
  }

  return cloneOfState;
}

module.exports = transformStateWithClones;
