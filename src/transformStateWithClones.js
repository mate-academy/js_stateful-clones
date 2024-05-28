'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const CloneObject = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(CloneObject, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete CloneObject[key];
        }
        break;

      case 'clear':
        for (const key in CloneObject) {
          delete CloneObject[key];
        }
        break;
    }

    result.push({ ...CloneObject });
  }

  return result;
}

module.exports = transformStateWithClones;
