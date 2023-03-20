'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateVers = [state];

  for (let i = 0; i < actions.length; i++) {
    let newState = { ...stateVers[i] };

    switch (actions[i].type) {
      case 'addProperties':
        for (const [key1, value1] of Object.entries(actions[i].extraData)) {
          newState[key1] = value1;
        }
        break;
      case 'removeProperties':
        for (const key2 of actions[i].keysToRemove) {
          if (newState.hasOwnProperty(key2)) {
            delete newState[key2];
          }
        }
        break;
      case 'clear':
        newState = {};
        break;
    }
    stateVers.push(newState);
  }

  return stateVers.slice(1);
}

module.exports = transformStateWithClones;
