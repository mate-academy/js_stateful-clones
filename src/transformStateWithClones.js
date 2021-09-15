'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let clone = { ...state };

  for (const action in actions) {
    const { type, extraData: extra, keysToRemove: keys } = actions[action];

    if (type === 'addProperties') {
      for (const a in extra) {
        clone[a] = extra[a];
      }
    }

    if (type === 'removeProperties') {
      for (const remove in keys) {
        delete clone[keys[remove]];
      }
    }

    if (type === 'clear') {
      clone = {};
    }
    result.push(Object.assign({}, clone));
  }

  return result;
}

module.exports = transformStateWithClones;
