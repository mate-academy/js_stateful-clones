'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clone = { ...state };
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
        clone = {};
        break;
    }
    cloneStates.push({ ...clone });
  }

  return cloneStates;
}

module.exports = transformStateWithClones;
