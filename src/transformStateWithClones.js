'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];

  function addProperties(st, extraData) {
    return {
      ...st,
      ...extraData,
    };
  }

  function removeProperties(st, keysToRemove) {
    const newState = { ...st };

    keysToRemove.forEach(key => delete newState[key]);

    return newState;
  }

  let clonedState = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        clonedState = addProperties(clonedState, action.extraData);
        break;
      case 'removeProperties':
        clonedState = removeProperties(clonedState, action.keysToRemove);
        break;
      case 'clear':
        clonedState = {};
        break;
      default:
        break;
    }

    states.push({ ...clonedState });
    clonedState = states[states.length - 1];
  });

  return states;
}

module.exports = transformStateWithClones;
