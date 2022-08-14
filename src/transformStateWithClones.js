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
        stateArray.push(newstate);
        Object.assign(newstate, actions[i].extraData);
        newstate = Object.assign({}, newstate);
        break;

      case 'removeProperties':
        stateArray.push(newstate);

        for (const del of actions[i].keysToRemove) {
          delete newstate[del];
        }
        newstate = Object.assign({}, newstate);
        break;

      case 'clear':
        const clear = {};

        stateArray.push(clear);
        newstate = {};
        break;
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
