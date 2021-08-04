'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneOfState = [];
  const copyOfState = {
    ...state,
  };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(copyOfState, actions[i].extraData);
        break;

      case 'removeProperties':
        for (const value of actions[i].keysToRemove) {
          delete copyOfState[value];
        }
        break;
      case 'clear':
        for (const removeKey in copyOfState) {
          delete copyOfState[removeKey];
        }
        break;
    }
    cloneOfState.push({ ...copyOfState });
  }

  return cloneOfState;

}

module.exports = transformStateWithClones;
