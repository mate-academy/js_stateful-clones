'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const newObj = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(newObj, extraData);
        res.push({ ...newObj });
        break;

      case 'removeProperties':
        for (let i = 0; i < keysToRemove.length; i++) {
          delete newObj[keysToRemove[i]];
        }
        res.push({ ...newObj });
        break;

      case 'clear':
        for (const key in newObj) {
          delete newObj[key];
        }
        res.push({ ...newObj });
        break;
    }
  }

  return res;
}

module.exports = transformStateWithClones;
