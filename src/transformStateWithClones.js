'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const historyState = [];

  for (const action of actions) {
    const transform = transformState(copyState, action);

    copyState = transform;

    historyState.push({ ...transform });
  }

  return historyState;
}

function transformState(state, action) {
  switch (action.type) {
    case 'addProperties':
      return {
        ...state,
        ...action.extraData,
      };

    case 'removeProperties':
      const newState = { ...state };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }

      return newState;

    case 'clear':
      return {};

    default:
      break;
  }
}

module.exports = transformStateWithClones;
