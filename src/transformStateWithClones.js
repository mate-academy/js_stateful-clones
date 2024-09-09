'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  let clone = Object.assign({}, state);
  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    if (i > 0) {
      clone = Object.assign({}, newState[i - 1]);
    }


    if (type === 'addProperties') {
      newState.push({ ...clone, ...extraData });
    }

    if (type === 'removeProperties') {
      for (const key in clone) {
        for (let l = 0; l < keysToRemove.length; l++) {
          if (key === keysToRemove[l]) {
            delete clone[key];
          }
        }
      }
      newState.push(clone);
    }

    if (type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
      newState.push(clone);
    }
  }
  return newState;
}

module.exports = transformStateWithClones;
