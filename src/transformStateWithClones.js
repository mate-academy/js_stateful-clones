'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const duplicate = { ...state };
  const array = [];

  for (const action in actions) {
    if (actions[action]['type'] === 'addProperties') {
      Object.assign(duplicate, actions[action]['extraData']);
    } else if (actions[action]['type'] === 'removeProperties') {
      for (const property in actions[action]['keysToRemove']) {
        delete duplicate[actions[action]['keysToRemove'][property]];
      }
    } else if (actions[action]['type'] === 'clear') {
      for (const property in duplicate) {
        delete duplicate[property];
      }
    }
    array.push({ ...duplicate });
  }

  return array;
}

module.exports = transformStateWithClones;
