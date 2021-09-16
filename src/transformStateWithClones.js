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

  for (const { type, extraData: extra, keysToRemove: keys } of actions) {
    switch (type) {
      case 'addProperties':
        for (const a in extra) {
          clone[a] = extra[a];
        }
        break;

      case 'removeProperties':
        for (const remove in keys) {
          delete clone[keys[remove]];
        }
        break;

      case 'clear':
        clone = {};
        break;
    }
    result.push(Object.assign({}, clone));
  }

  return result;
}

module.exports = transformStateWithClones;
