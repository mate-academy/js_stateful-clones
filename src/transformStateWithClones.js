'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const cloneStates = [];

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties' :
        Object.assign(clone, item.extraData);
        break;

      case 'removeProperties' :
        for (const key of item.keysToRemove) {
          delete clone[key];
        }
        break;

      case 'clear' :
        for (const key in clone) {
          delete clone[key];
        }
        break;
    }
    cloneStates.push({ ...clone });
  }

  return cloneStates;
}

module.exports = transformStateWithClones;
