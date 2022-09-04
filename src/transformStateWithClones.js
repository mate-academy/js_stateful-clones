'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const res = [];
  const stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);

        break;

      case 'removeProperties':
        action.keysToRemove.forEach((x) => {
          delete stateClone[x];
        });
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    }

    res.push({ ...stateClone });
  }

  return res;
}

module.exports = transformStateWithClones;
