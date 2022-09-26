'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const array = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        clone[key] = actions[i].extraData[key];
      }
    } else if (actions[i].type === 'removeProperties') {
      for (const item of actions[i].keysToRemove) {
        delete clone[item];
      }
    } else if (actions[i].type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
    }

    const obj = { ...clone };

    array.push(obj);
  }

  return array;
}

module.exports = transformStateWithClones;
