'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const allStateSteps = [];
  const stateCopy = { ...state };
  let changeStep = {};

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
    }

    changeStep = { ...stateCopy };
    allStateSteps.push(changeStep);
  }

  return allStateSteps;
}

module.exports = transformStateWithClones;
