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

  actions.forEach((action) => {
    if (action.type === 'clear') {
      stateCopy = {};
    } else if (action.type === 'addProperties') {
      stateCopy = { ...stateCopy, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      stateCopy = { ...stateCopy };

      action.keysToRemove.forEach((key) => {
        delete stateCopy[key];
      });
    }
    newState.push({ ...stateCopy });
  });

  return newState;
}

module.exports = transformStateWithClones;
