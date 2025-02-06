'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  let stateCopy = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const clonedState = { ...stateCopy };

    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(clonedState, actions[i].extraData);
        break;
      case 'removeProperties':
        for (let key = 0; key < actions[i].keysToRemove.length; key++) {
          delete clonedState[actions[i].keysToRemove[key]];
        }
        break;
      case 'clear':
        for (const key in clonedState) {
          delete clonedState[key];
        }
        break;
    }
    stateCopy = clonedState;
    newState.push(clonedState);
  }

  return newState;
}

module.exports = transformStateWithClones;
