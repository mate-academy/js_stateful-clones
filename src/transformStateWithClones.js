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
    if (actions[key].type === 'addProperties') {
      Object.assign(objectCopy, actions[key].extraData);
      stateCopy.push({ ...objectCopy });
    }

    if (actions[key].type === 'removeProperties') {
      for (const rem in actions[key].keysToRemove) {
        delete objectCopy[actions[key].keysToRemove[rem]];
      }
      stateCopy.push({ ...objectCopy });
    }

    if (actions[key].type === 'clear') {
      objectCopy = {};
      stateCopy.push({ ...{} });
    }
  }

  return stateCopy;
}

module.exports = transformStateWithClones;
