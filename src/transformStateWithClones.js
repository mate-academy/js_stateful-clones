'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let res = [];
  const newState = { ...state };

  res[0] = newState;

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        const addRes = Object.assign(res[i], actions[i].extraData);

        res[i + 1] = { ...addRes };
        break;

      case 'removeProperties':
        const removeRes = res[i];
        const keys = actions[i].keysToRemove;

        for (const key of keys) {
          delete removeRes[key];
        }
        res[i + 1] = { ...removeRes };
        break;

      case 'clear':
        const clearRes = res[i];

        for (const prop in clearRes) {
          delete clearRes[prop];
        }
        res[i + 1] = { ...clearRes };
        break;
    }
  }
  res = res.slice(0, res.length - 1);

  return res;
}

module.exports = transformStateWithClones;
