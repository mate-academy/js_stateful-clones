'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  /*if (actions[0].type === 'addProperties') {
    for (const key in actions[0].extraData) {
      if (Object.hasOwn(state, key) === true) {
        continue;
      }
      state[key] = actions[0].extraData[key];
    }
  } else if (actions[0].type === 'removeProperties') {
    for (const key in actions[0].keysToRemove) {
      delete state[key];
    }
  } else if (actions[0].type === 'clear') {
    for (const key in state) {
      delete state[key];
    }
  }*/

  for (const action of actions) {
    console.log(action.type, action.extraData);

    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        state[key] = action.extraData[key];
      }
    }
  }

  console.log(state);
}

module.exports = transformStateWithClones;
