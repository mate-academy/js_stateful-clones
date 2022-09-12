'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const obj = {};
  const arr = [];

  for (const keys in state) {
    obj[keys] = state[keys];
  }

  for (let i = 0; i < actions.length; i++) {
    if (actions[i]['type'] === 'addProperties') {
      for (const keys in actions[i]['extraData']) {
        obj[keys] = actions[i]['extraData'][keys];
      }
    } else if (actions[i]['type'] === 'removeProperties') {
      for (const keys of actions[i]['keysToRemove']) {
        delete obj[keys];
      }
    } else if (actions[i]['type'] === 'clear') {
      for (const keys in obj) {
        delete obj[keys];
      }
    }

    const clone = {};

    for (const keys in obj) {
      clone[keys] = obj[keys];
    }
    arr.push(clone);
  }

  return arr;
}

module.exports = transformStateWithClones;
