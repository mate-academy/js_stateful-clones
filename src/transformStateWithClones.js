'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const obj = Object.assign({}, state);
  const array = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete obj[key];
        }
        break;
      case 'addProperties':
        Object.assign(obj, action.extraData);
        break;
    }
    array.push(Object.assign({}, obj));
  }

  return array;
}
module.exports = transformStateWithClones;
