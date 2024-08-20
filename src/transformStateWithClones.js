'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateNew = JSON.parse(JSON.stringify(state));

  for (let key = 0; key < actions.length; ++key) {
    if (actions[key].type === 'addProperties') {
      const stateNew1 = Object.assign({}, stateNew, actions[key].extraData);

      stateHistory.push(stateNew1);
      stateNew = JSON.parse(JSON.stringify(stateNew1));
    }

    if (actions[key].type === 'removeProperties') {
      const stateNew2 = {};

      Object.assign(stateNew2, stateNew);

      for (const i in actions[key].keysToRemove) {
        delete stateNew2[actions[key].keysToRemove[i]];
      }
      stateHistory.push(stateNew2);
      stateNew = JSON.parse(JSON.stringify(stateNew2));
    }

    if (actions[key].type === 'clear') {
      const stateNew3 = {};

      stateHistory.push(stateNew3);
      stateNew = JSON.parse(JSON.stringify(stateNew3));
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
