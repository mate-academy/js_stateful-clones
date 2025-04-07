'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const stateCopy = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(stateCopy, obj.extraData);
        break;
      case 'removeProperties':
        for (const toDelete of obj.keysToRemove) {
          delete stateCopy[toDelete];
        }
        break;
      case 'clear':
        Object.keys(stateCopy).forEach((key) => delete stateCopy[key]);
        break;
    }
    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
