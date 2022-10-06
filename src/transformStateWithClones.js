'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newstate = Object.assign({}, state);
  const stateArray = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(newstate, actions[i].extraData);
        newstate = Object.assign({}, newstate);
        break;

      case 'removeProperties':
        for (const del of actions[i].keysToRemove) {
          delete newstate[del];
        }
        newstate = Object.assign({}, newstate);
        break;

      case 'clear':
        newstate = {};
        break;
    }
    stateArray.push({ ...newstate });
  }

  return stateArray;
}

module.exports = transformStateWithClones;
