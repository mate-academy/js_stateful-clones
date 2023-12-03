'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  let obj;
  obj = Object.assign({}, state);

  function add(item) {
    Object.assign(obj, item);
  }

  function del(item) {
    for (let i = 0; i < item.length; i++) {
      delete obj[item[i]];
    }
  }

  function clear() {
    obj = {};
  }

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(obj, actions[i].extraData)
      add(actions[i].extraData);
    } else if (actions[i].type === 'removeProperties') {
      del(actions[i].keysToRemove);
    } else if (actions[i].type === 'clear') {
      clear();
    }
  }
  return [obj];
}
module.exports = transformStateWithClones;
