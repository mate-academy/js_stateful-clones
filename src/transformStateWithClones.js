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
    if (action.type === 'addProperties') {
      Object.assign(newObj, action.extraData);
      res.push({ ...newObj });
    } else if (action.type === 'removeProperties') {
      for (let i = 0; i < action.keysToRemove.length; i++) {
        delete newObj[action.keysToRemove[i]];
      }
      res.push({ ...newObj });
    } else if (action.type === 'clear') {
      for (const key in newObj) {
        delete newObj[key];
      }
      res.push({ ...newObj });
    }
  }

  return res;
}

module.exports = transformStateWithClones;
