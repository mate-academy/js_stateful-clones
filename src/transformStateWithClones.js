'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let objectCopy = { ...state };
  const stateCopy = [];

  for (const key in actions) {
    switch (actions[key].type) {
      case 'addProperties':
        Object.assign(objectCopy, actions[key].extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove in actions[key].keysToRemove) {
          delete objectCopy[actions[key].keysToRemove[keyToRemove]];
        }
        break;
      case 'clear':
        objectCopy = {};
        break;
      default:
        break;
    }
    stateCopy.push({ ...objectCopy });
  }

  return stateCopy;
}

module.exports = transformStateWithClones;
