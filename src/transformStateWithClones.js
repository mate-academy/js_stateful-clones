'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copy = { ...state };
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
        copy = {};
        break;
    }
    result.push({ ...copy });
  }

  return result;
}
module.exports = transformStateWithClones;
