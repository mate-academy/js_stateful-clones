'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const obj = { ...state };
  const removeKeys = (keys) => keys.forEach(key => {
    delete obj[key];
  });

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(obj, action.extraData);
        break;
      case 'removeProperties':
        removeKeys(action.keysToRemove);
        break;
      case 'clear':
        removeKeys(Object.keys(obj));
        break;
    }

    res.push({ ...obj });
  }

  return res;
}

module.exports = transformStateWithClones;
