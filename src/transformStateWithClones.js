'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const obj = { ...state };
  const answer = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(obj, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (const prop of actions[i].keysToRemove) {
        delete obj[prop];
      }
    }

    if (actions[i].type === 'clear') {
      for (const value in obj) {
        delete obj[value];
      }
    }

    answer[i] = { ...obj };
  }

  return answer;
}

module.exports = transformStateWithClones;
