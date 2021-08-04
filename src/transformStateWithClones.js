'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const stateClone = { ...state };

  for (const properties of actions) {
    switch (properties.type) {
      case 'addProperties':
        Object.assign(stateClone, properties.extraData);
        break;

      case 'removeProperties':
        for (const keys in properties.keysToRemove) {
          delete stateClone[properties.keysToRemove[keys]];
        }
        break;

      case 'clear':
        for (const properties2 in stateClone) {
          delete stateClone[properties2];
        };
        break;
    }

    arr.push(Object.assign({}, stateClone));
  }

  return arr;
}

module.exports = transformStateWithClones;
