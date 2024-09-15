'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const createState = (state, { type, extraData, keysToRemove }) => {
  switch (type) {
    case 'addProperties':
      return {
        ...state,
        ...extraData,
      };

    case 'removeProperties':
      for (const key of keysToRemove) {
        if (key in state) {
          delete state[key];
        }
      }

      return state;

    case 'clear':
      return {};

    default:
      return 'Unexpected action or error';
  }
};

function transformStateWithClones(state, actions) {
  let previousState = { ...state };
  const createdStates = [];

  for (const action of actions) {
    const newState = createState(previousState, action);

    createdStates.push(newState);

    previousState = { ...newState };
  }

  return createdStates;
}

module.exports = transformStateWithClones;
