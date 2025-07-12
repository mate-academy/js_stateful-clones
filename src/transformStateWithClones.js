'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const recievedStates = [];
  let stateCopy = Object.assign({}, state);

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      stateCopy = { ...stateCopy, ...action.extraData };
      recievedStates.push({ ...stateCopy });
    } else if (action.type === 'removeProperties') {
      const newState = { ...stateCopy };

      action.keysToRemove.forEach((removedKey) => {
        delete newState[removedKey];
      });
      stateCopy = newState;
      recievedStates.push({ ...stateCopy });
    } else if (action.type === 'clear') {
      stateCopy = {};
      recievedStates.push({ ...stateCopy });
    }
  });

  return recievedStates;
}

module.exports = transformStateWithClones;
