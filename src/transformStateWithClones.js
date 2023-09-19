'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const res = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(clone, action.extraData);
    }

    if (action.type === 'removeProperties') {
      const remove = action.keysToRemove;

      for (let i = 0; i < remove.length; i++) {
        delete clone[remove[i]];
      }
    }

    if (action.type === 'clear') {
      for (const st in clone) {
        delete clone[st];
      }
    }

    res.push({ ...clone });
  }

  return res;
}

module.exports = transformStateWithClones;
