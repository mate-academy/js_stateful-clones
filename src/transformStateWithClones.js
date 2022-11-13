'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const clones = [];

  actions.forEach(action => {
    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);
    } else if (action.type === 'clear') {
      currentState = {};
    } else {
      action.keysToRemove.forEach(key => {
        delete currentState[key];
      });
    }
    clones.push({ ...currentState });
  });

  return clones;
}

module.exports = transformStateWithClones;
