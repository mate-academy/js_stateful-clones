'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newOb = { ...state };

  for (const action of actions) {
    switch (true) {
      case action.type === 'addProperties':
        Object.assign(newOb, action.extraData);
        break;
      case action.type === 'removeProperties':
        for (const del of action.keysToRemove) {
          delete newOb[del];
        }
        break;
      case action.type === 'clear':
        for (const all in newOb) {
          delete newOb[all];
        }
        break;
    }

    result.push({ ...newOb });
  }

  return result;
}
module.exports = transformStateWithClones;
