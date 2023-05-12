'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

const addProperties = (extraData, transformedState) => {
  Object.assign(transformedState, extraData);
};

const deleteCertainProperties = (keysToRemove, transformedState) => {
  for (const key of keysToRemove) {
    delete transformedState[key];
  }
};

const deleteAllProperties = (transformedState) => {
  for (const key of Object.keys(transformedState)) {
    delete transformedState[key];
  }
};

function transformStateWithClones(state, actions) {
  const transformedState = { ...state };
  const transformedStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(action.extraData, transformedState);
        break;

      case 'removeProperties':
        deleteCertainProperties(action.keysToRemove, transformedState);
        break;

      case 'clear':
        deleteAllProperties(transformedState);
        break;

      default:
        throw new Error('Wrong action type!');
    }

    transformedStates.push({ ...transformedState });
  }

  return transformedStates;
}

module.exports = transformStateWithClones;
