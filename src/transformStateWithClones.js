'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state }; // Clone initial state
  const states = []; // Array to store states after each action

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;
      case 'removeProperties':
        stateCopy = { ...stateCopy };
        action.keysToRemove.forEach((key) => delete stateCopy[key]);
        break;
      default:
        break;
    }
    states.push({ ...stateCopy }); // Push a clone of current state
  });

  return states;
}

module.exports = transformStateWithClones;
