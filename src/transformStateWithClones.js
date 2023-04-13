'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let lastState = state;

  actions.forEach((action) => {
    lastState = getNextState(lastState, action);

    result.push(lastState);
  });

  return result;
}

function getNextState(lastState, action) {
  switch (action.type) {
    case 'addProperties':
      return {
        ...lastState,
        ...action.extraData,
      };

    case 'removeProperties':
      const newState = { ...lastState };

      action.keysToRemove.forEach((key) => {
        delete newState[key];
      });

      return newState;

    case 'clear':
      return {};
  }
}

module.exports = transformStateWithClones;
