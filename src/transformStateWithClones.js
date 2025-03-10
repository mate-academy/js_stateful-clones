'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArray = [];
  let currentState = { ...state };

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      currentState = { ...currentState };

      for (const item of action.keysToRemove) {
        delete currentState[item];
      }
    }

    if (action.type === 'clear') {
      currentState = {};
    }

    newArray.push({ ...currentState });
  });

  return newArray;
}

module.exports = transformStateWithClones;
