'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateWithClone = [];
  const copyState = { ...state };

  function clone(obj) {
    return { ...obj };
  }

  actions.forEach(action => {
    if (action.type === 'addProperties') {
      Object.assign(copyState, action.extraData);
      stateWithClone.push(clone(copyState));
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(element => {
        delete copyState[element];
      });
      stateWithClone.push(clone(copyState));
    }

    if (action.type === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }
      stateWithClone.push(clone(copyState));
    }
  });

  return stateWithClone;
}

module.exports = transformStateWithClones;
