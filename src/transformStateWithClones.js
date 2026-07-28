'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];

  for (const obj of actions) {
    const action = obj.type;
    const addition = obj.extraData;
    const minus = obj.keysToRemove;

    if (action === 'addProperties') {
      Object.assign(state, addition);
      result.push(state);
    } else if (action === 'removeProperties') {
      for (const key of minus) {
        delete state[key];
      }
      result.push(state);
    } else if (action === 'clear') {
      for (const key1 in state) {
        delete state[key1];
      }
      result.push(state);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
