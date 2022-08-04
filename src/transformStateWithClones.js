'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const clonesArray = [];

  for (const key in actions) {
    if (actions[key].type === 'addProperties') {
      Object.assign(clone, actions[key].extraData);
    } else if (actions[key].type === 'removeProperties') {
      for (const i in actions[key].keysToRemove) {
        delete clone[`${actions[key].keysToRemove[i]}`];
      }
    } else if (actions[key].type === 'clear') {
      for (const j in clone) {
        delete clone[j];
      }
    }

    clonesArray.push({ ...clone });
  }

  return clonesArray;
}

module.exports = transformStateWithClones;
