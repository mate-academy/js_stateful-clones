'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let copyState = { ...state };

  actions.forEach((item) => {
    switch (item.type) {
      case 'clear':
        copyState = {};
        break;

      case 'addProperties':
        const keysExtra = Object.keys(item.extraData);
        const values = Object.values(item.extraData);

        for (let n = 0; n < keysExtra.length; n++) {
          copyState[keysExtra[n]] = values[n];
        }
        break;

      case 'removeProperties':
        const keys = item.keysToRemove;

        keys.forEach((e) => delete copyState[e]);
        break;
    }
    stateHistory.push({ ...copyState });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
