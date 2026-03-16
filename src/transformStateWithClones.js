'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const temp = {};

  Object.assign(temp, state);

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(temp, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete temp[key];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in temp) {
        delete temp[key];
      }
    }
    result.push({ ...temp });
  }

  return result;
}

module.exports = transformStateWithClones;
