'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copy = { ...state };
  const result = [];

  for (const act of actions) {
    if (act.type === 'clear') {
      copy = {};
    }

    if (act.type === 'removeProperties') {
      copy = { ...copy };

      for (const key of act.keysToRemove) {
        delete copy[key];
      }
    }

    if (act.type === 'addProperties') {
      copy = { ...copy };

      for (const key in act.extraData) {
        copy[key] = act.extraData[key];
      }
    }
    result.push(copy);
  }

  return result;
}

module.exports = transformStateWithClones;
