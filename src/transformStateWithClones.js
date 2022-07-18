'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = [];
  let obj = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(obj, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete obj[key];
        }
        break;

      case 'clear':
        obj = {};
        break;
    }
    clone.push({ ...obj });
  }

  return clone;
}
module.exports = transformStateWithClones;
