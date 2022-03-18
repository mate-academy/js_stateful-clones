'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const objectNew = {};
  const arrayNew = [];

  for (const pr in state) {
    objectNew[pr] = state[pr];
  }

  for (const act of actions) {
    if (act['type'] === 'clear') {
      for (const prop in objectNew) {
        delete objectNew[prop];
      }

      arrayNew.push({});
    } else if (act['type'] === 'addProperties') {
      for (const propad in act['extraData']) {
        objectNew[propad] = act['extraData'][propad];
      }

      const addObj = { ...objectNew };

      arrayNew.push(addObj);
    } else if (act['type'] === 'removeProperties') {
      for (const proprem of act['keysToRemove']) {
        if (!(proprem in objectNew)) {
          continue;
        }
        delete objectNew[proprem];
      }

      const removeObj = { ...objectNew };

      arrayNew.push(removeObj);
    }
  }

  return arrayNew;
}

module.exports = transformStateWithClones;
