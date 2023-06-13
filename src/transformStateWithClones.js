'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrOfModifiedStates = [];
  let modifiedState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      modifiedState = {
        ...modifiedState, ...action.extraData,
      };
    }

    if (action.type === 'clear') {
      modifiedState = {};
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete modifiedState[key];
      }
    }

    arrOfModifiedStates.push({ ...modifiedState });
  }

  return arrOfModifiedStates;
}

module.exports = transformStateWithClones;
