'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newarr = [];
  const statecopy = {
    ...state,
  };

  for (const obj of actions) {
    switch (obj.type) {
      case 'clear': {
        for (const key in statecopy) {
          delete statecopy[key];
        }
        break;
      }

      case 'addProperties': {
        for (const key in obj.extraData) {
          statecopy[key] = obj.extraData[key];
        }
        break;
      }

      case 'removeProperties': {
        for (const key of obj.keysToRemove) {
          delete statecopy[key];
        }
        break;
      }
    }
    newarr.push({ ...statecopy });
  }

  return newarr;
}

module.exports = transformStateWithClones;
