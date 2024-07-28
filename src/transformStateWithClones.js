'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const massiveToReturn = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(copyState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete copyState[key];
      }
    }

    if (action.type === 'clear') {
      for (const prop in copyState) {
        delete copyState[prop];
      }
    }
    massiveToReturn.push({ ...copyState });
  }

  return massiveToReturn;
}

module.exports = transformStateWithClones;
