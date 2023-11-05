'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonesArray = [];
  let cloneState = { ...state };

  actions.forEach(action => {
    let currentClone = { ...cloneState };

    if (action.type === 'addProperties') {
      const { extraData } = action;

      Object.assign(currentClone, extraData);
    } else if (action.type === 'removeProperties') {
      const { keysToRemove } = action;

      keysToRemove.forEach(key => {
        delete currentClone[key];
      });
    } else if (action.type === 'clear') {
      for (const key in currentClone) {
        delete currentClone[key];
      }
      currentClone = {};
    }

    clonesArray.push(currentClone);
    cloneState = { ...currentClone };
  });

  return clonesArray;
}

module.exports = transformStateWithClones;
