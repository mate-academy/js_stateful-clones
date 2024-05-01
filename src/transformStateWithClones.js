'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let newObj = Object.assign({}, state);

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      newObj = Object.assign(newObj, obj.extraData);
    }

    if (obj.type === 'removeProperties') {
      for (const keyToRemove of obj.keysToRemove) {
        delete newObj[keyToRemove];
      }
    }

    if (obj.type === 'clear') {
      newObj = {};
    }
    res.push({ ...newObj });
  }

  return res;
}

module.exports = transformStateWithClones;
