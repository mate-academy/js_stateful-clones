'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const copyState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const type = actions[i].type;

    if (type === 'addProperties') {
      const extra = actions[i].extraData;

      Object.assign(copyState, extra);
      res.push({ ...copyState });
    }

    if (type === 'removeProperties') {
      const removeList = actions[i].keysToRemove;

      for (let r = 0; r < removeList.length; r++) {
        delete copyState[removeList[r]];
      }

      res.push({ ...copyState });
    }

    if (type === 'clear') {
      for (const member in copyState) {
        delete copyState[member];
      }

      res.push({});
    }
  }

  return res;
}

module.exports = transformStateWithClones;
