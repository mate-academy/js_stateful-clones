'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  let object = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(object, action.extraData);

        break;
      case 'clear':
        object = {};
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete object[key];
        }
        break;
      default:
        throw new Error('Invalid action type.');
    }
    array.push({ ...object });
  }

  return array;
}

module.exports = transformStateWithClones;
