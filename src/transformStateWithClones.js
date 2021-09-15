'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copy = Object.assign({}, state);
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        copy = {
          ...copy,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete copy[remove];
        }
        break;

      case 'clear':
        for (const deleteKey in copy) {
          delete copy[deleteKey];
        }
        break;
    }
    result.push({ ...copy });
  }

  return result;
}
module.exports = transformStateWithClones;
