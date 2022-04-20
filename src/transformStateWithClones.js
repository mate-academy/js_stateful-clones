'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i]['type'] === 'addProperties') {
      Object.assign(clone, actions[i]['extraData']);
    }

    if (actions[i]['type'] === 'removeProperties') {
      for (const property in actions[i]['keysToRemove']) {
        delete clone[actions[i]['keysToRemove'][property]];
      }
    }

    if (actions[i]['type'] === 'clear') {
      for (const property in clone) {
        delete clone[property];
      }
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
