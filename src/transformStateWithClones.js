'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const addProperties = 'addProperties';
  const removeProperties = 'removeProperties';
  const clear = 'clear';
  let newObj = { ...state };
  const newArr = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === addProperties) {
      Object.assign(newObj, actions[i].extraData);
      newArr.push(Object.assign({}, newObj));
    }

    if (actions[i].type === removeProperties) {
      for (const key of actions[i].keysToRemove) {
        delete newObj[key];
      }
      newArr.push(Object.assign({}, newObj));
    }

    if (actions[i].type === clear) {
      newObj = {};
      newArr.push({});
    }
  }

  return newArr;
}

module.exports = transformStateWithClones;
