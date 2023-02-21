'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArray = [];
  const copy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);

        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete copy[remove];
        }

        break;

      case 'clear':
        for (const deleteAll in copy) {
          delete copy[deleteAll];
        }
        break;

      default:
        throw Error('this type does not exist');
    }
    newArray.push({ ...copy });
  }

  return newArray;
}

module.exports = transformStateWithClones;
