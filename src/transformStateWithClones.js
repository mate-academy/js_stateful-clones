'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const copy = Object.assign({}, state);

  for (const partAction of actions) {
    if (partAction.type === 'addProperties') {
      Object.assign(copy, partAction.extraData);
    } else if (partAction.type === 'removeProperties') {
      for (const key of partAction.keysToRemove) {
        delete copy[key];
      }
    } else if (partAction.type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }
    }
    res.push({ ...copy });
  }

  return res;
}

module.exports = transformStateWithClones;
