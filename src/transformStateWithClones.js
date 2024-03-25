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

    switch (action.type) {
      case 'addProperties':
        Object.assign(transformedState, action.extraData);
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete transformedState[property];
        }
        break;

      case 'clear':
        for (const key in transformedState) {
          delete transformedState[key];
        }
        break;
    }

    transformations.push(transformedState);
    stateClone = transformedState;
  }

  return transformations;
}

module.exports = transformStateWithClones;
