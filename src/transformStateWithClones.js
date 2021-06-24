'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateClones = [];

  const stateCopy = { ...state };

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        Object.assign(stateCopy, item.extraData);
        break;
      case 'removeProperties':
        for (const value of item.keysToRemove) {
          delete stateCopy[value];
        }
        break;
      case 'clear':
        for (const all in stateCopy) {
          delete stateCopy[all];
        }
        break;
    }

    stateClones.push({ ...stateCopy });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
