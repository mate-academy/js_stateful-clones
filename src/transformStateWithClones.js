'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];

  const clonState = { ...state };

  for (const action of actions) {
    // console.log(action);

    if (action.type === 'addProperties') {
      Object.assign(clonState, action.extraData);
      states.push({ ...clonState });
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete clonState[key];
      }
      states.push({ ...clonState });
    } else if (action.type === 'clear') {
      for (const key in clonState) {
        if (clonState[key]) {
          delete clonState[key];
        }
      }
      states.push({ ...clonState });
    }
  }

  return states;
}

module.exports = transformStateWithClones;
