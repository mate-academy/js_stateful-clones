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
    switch (action.type) {
      case 'addProperties':
        Object.assign(clonState, action.extraData);
        states.push({ ...clonState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clonState[key];
        }
        states.push({ ...clonState });
        break;

      case 'clear':
        for (const key in clonState) {
          if (clonState[key]) {
            delete clonState[key];
          }
        }
        states.push({ ...clonState });
        break;
    }
  }

  return states;
}

module.exports = transformStateWithClones;
