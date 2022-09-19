'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const condition = { ...state };
  const states = new Array(actions.length);

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    switch (action.type) {
      case 'addProperties':
        for (const data in action.extraData) {
          condition[data] = (action.extraData)[data];
        }
        break;
      case 'removeProperties':
        for (let j = 0; j < (action.keysToRemove).length; j++) {
          delete condition[action.keysToRemove[j]];
        }
        break;

      default: for (const property in condition) {
        delete condition[property];
      }
    }
    states[i] = { ...condition };
  }

  return states;
}

module.exports = transformStateWithClones;
