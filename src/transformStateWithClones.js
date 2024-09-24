'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateArray = [];
  const stateModif = { ...state };

  for (const i of actions) {
    if (i.type === 'addProperties') {
      Object.assign(stateModif, i.extraData);
      stateArray.push({ ...stateModif });
      continue;
    }

    if (i.type === 'removeProperties') {
      for (const key of i.keysToRemove) {
        delete stateModif[key];
      }
      stateArray.push({ ...stateModif });
      continue;
    }

    if (i.type === 'clear') {
      Object.keys(stateModif).forEach((key) => delete stateModif[key]);
      stateArray.push({ ...stateModif });
      continue;
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
