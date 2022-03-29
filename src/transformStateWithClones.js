'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayNew = [];
  let objectNew = Object.assign({}, state);

  for (const act of actions) {
    if (act['type'] === 'clear') {
      objectNew = {};
    } else if (act['type'] === 'addProperties') {
      Object.assign(objectNew, act['extraData']);
    } else if (act['type'] === 'removeProperties') {
      for (const proprem of act['keysToRemove']) {
        delete objectNew[proprem];
      }
    }
    arrayNew.push({ ...objectNew });
  }

  return arrayNew;
}

module.exports = transformStateWithClones;
