'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateNew = Object.assign({ ...state });

  for (let key = 0; key < actions.length; ++key) {
    switch (actions[key].type) {
      case 'addProperties':
        stateNew = Object.assign({}, stateNew, actions[key].extraData);
        break;

      case 'removeProperties':
        stateNew = Object.assign({}, stateNew);

        for (const i in actions[key].keysToRemove) {
          delete stateNew[actions[key].keysToRemove[i]];
        }
        break;

      case 'clear':
        stateNew = {};
        break;
    }

    stateHistory.push(stateNew);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
