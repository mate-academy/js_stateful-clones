'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const clones = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        addProperties(stateClone, extraData);
        break;

      case 'removeProperties':
        removeProperties(stateClone, keysToRemove);
        break;

      case 'clear':
        clear(stateClone);
        break;

      default:
        return;
    }

    clones.push({ ...stateClone });
  }

  return clones;
}

function addProperties(obj, properties) {
  for (const property in properties) {
    obj[property] = properties[property];
  }
}

function removeProperties(obj, keys) {
  for (const key of keys) {
    delete obj[key];
  }
}

function clear(obj) {
  for (const key in obj) {
    delete obj[key];
  }
}

module.exports = transformStateWithClones;
