'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' : {
        Object.assign(newState, action.extraData);
        break;
      }

      case 'removeProperties' : {
        for (const i of action.keysToRemove) {
          delete newState[i];
        }
        break;
      }

      case 'clear' : {
        newState = {};
        break;
      }
    }
    clones.push({ ...newState });
  }

  return clones;
}

module.exports = transformStateWithClones;
