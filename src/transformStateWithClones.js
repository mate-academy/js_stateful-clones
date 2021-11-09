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

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(copy, obj.extraData);
        break;

      case 'removeProperties' :
        for (const index of obj.keysToRemove) {
          delete copy[index];
        };
        break;

      case 'clear':
        copy = {};
    }

    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
