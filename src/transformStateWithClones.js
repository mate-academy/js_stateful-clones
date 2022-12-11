'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newObject = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        newObject = {};
        break;

      case 'addProperties':
        Object.assign(newObject, action.extraData);
        break;

      case 'removeProperties':
        for (const keys of action.keysToRemove) {
          delete newObject[keys];
        }
        break;
    }

    result.push({ ...newObject });
  }

  return result;
}

module.exports = transformStateWithClones;
