'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const array = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(clone, action.extraData);
        array.push({ ...clone });
        break;

      case 'removeProperties' :
        for (const keys of action.keysToRemove) {
          if (!clone.keys) {
            delete clone[keys];
          }
        }

        array.push({ ...clone });
        break;

      case 'clear' :
        for (const key in clone) {
          delete clone[key];
        }

        array.push({ ...clone });
    }
  }

  return array;
}

module.exports = transformStateWithClones;
