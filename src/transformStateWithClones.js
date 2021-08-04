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
      Object.assign(clone, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete clone[key];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
    }

    array.push({ ...clone });
  }

  return array;
}

module.exports = transformStateWithClones;
