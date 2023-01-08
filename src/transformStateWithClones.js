'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clone = { ...state };
  const result = [];

  for (const prop of actions) {
    switch (prop.type) {
      case 'addProperties':
        Object.assign(clone, prop.extraData);
        break;

      case 'removeProperties':
        for (const key of prop.keysToRemove) {
          delete clone[key];
        }
        break;

      case 'clear':
        clone = {};
        break;
    }

    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
