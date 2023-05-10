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
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        stateWithClone.push(clone(copyState));
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(element => {
          delete copyState[element];
        });
        stateWithClone.push(clone(copyState));
        break;
      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        stateWithClone.push(clone(copyState));
        break;
    }
  });

  return stateWithClone;
}

module.exports = transformStateWithClones;
