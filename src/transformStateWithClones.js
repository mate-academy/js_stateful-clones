'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const transformations = [];

  for (const action of actions) {
    const transformedState = { ...stateClone };

    if (action.type === 'addProperties') {
      Object.assign(transformedState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const property of action.keysToRemove) {
        delete transformedState[property];
      }
    }

    if (action.type === 'clear') {
      for (const key in transformedState) {
        delete transformedState[key];
      }
    }

    transformations.push(transformedState);
    stateClone = transformedState;
  }

  return transformations;
}

module.exports = transformStateWithClones;
