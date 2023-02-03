'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clone = Object.assign({}, state);

  for (const ch of actions) {
    if (ch.type === 'addProperties') {
      Object.assign(clone, ch.extraData);
    }

    if (ch.type === 'removeProperties') {
      for (const del of ch.keysToRemove) {
        delete clone[del];
      }
    }

    if (ch.type === 'clear') {
      Object.keys(clone).forEach(key => delete clone[key]);
    }

    const obj = Object.assign({}, clone);

    result.push(obj);
  }

  return result;
}

module.exports = transformStateWithClones;
