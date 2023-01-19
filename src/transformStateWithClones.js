'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let copy = { ...state };

  for (const property of actions) {
    switch (property.type) {
      case 'addProperties':
        Object.assign(copy, property.extraData);
        result.push({ ...copy });
        break;

      case 'removeProperties':
        for (const item of property.keysToRemove) {
          delete copy[item];
        }
        result.push({ ...copy });
        break;

      case 'clear':
        copy = {};
        result.push({ ...copy });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
