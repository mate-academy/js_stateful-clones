'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const res = [];

  for (const i of actions) {
    if (i.type === 'addProperties') {
      Object.assign(stateClone, i.extraData);
    }

    if (i.type === 'removeProperties') {
      for (const j of i.keysToRemove) {
        delete stateClone[j];
      }
    }

    if (i.type === 'clear') {
      Object.keys(stateClone).forEach((key) => delete stateClone[key]);
    }

    res.push({ ...stateClone });
  }

  return res;
}

module.exports = transformStateWithClones;
