'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const clones = [];

  for (const item of actions) {
    const { type, extraData, keysToRemove } = item;

    switch (type) {
      case 'addProperties':
        addProperties(clone, extraData);
        break;

      case 'removeProperties':
        removeProperties(clone, keysToRemove);
        break;

      case 'clear':
        clear(clone);
        break;

      default:
        break;
    }

    clones.push({ ...clone });
  }

  return clones;
}

function addProperties(clone, item) {
  for (const key in item) {
    clone[key] = item[key];
  }
}

function removeProperties(clone, item) {
  for (const key of item) {
    delete clone[key];
  }
}

function clear(clone) {
  for (const key in clone) {
    delete clone[key];
  }
}

module.exports = transformStateWithClones;
