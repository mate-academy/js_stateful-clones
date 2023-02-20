'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state = {}, actions) {
  const arr = [];
  const nevobj = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in nevobj) {
          delete nevobj[key];
        }
        arr.push({ ...nevobj });
        break;
      case 'addProperties':
        Object.assign(nevobj, action.extraData);
        arr.push({ ...nevobj });
        break;
      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete nevobj[remove];
        }
        arr.push({ ...nevobj });
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
