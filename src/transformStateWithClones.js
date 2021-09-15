'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const obj = { ...state };
  const removeKeys = (keys) => keys.forEach(key => {
    delete obj[key];
  });

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(obj, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      removeKeys(actions[i].keysToRemove);
    }

    if (actions[i].type === 'clear') {
      removeKeys(Object.keys(obj));
    }
    arr.push({ ...obj });
  }

  return arr;
}

module.exports = transformStateWithClones;
