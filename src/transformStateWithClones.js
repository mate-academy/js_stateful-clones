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
        removeProperties(stateClone, Object.keys(stateClone));
        break;

      default:
        throw new Error(`Action of type ${type} is invalid`);
    }

    clones.push({ ...stateClone });
  }

  return clones;
}

function addProperties(obj, properties) {
  Object.assign(obj, properties);
}

function removeProperties(obj, keys) {
  for (const key of keys) {
    delete obj[key];
  }
}

module.exports = transformStateWithClones;
