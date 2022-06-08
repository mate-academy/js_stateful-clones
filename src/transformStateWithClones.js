'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let prevState = state;

  for (const action of actions) {
    const newState = transform(prevState, action);

    result.push(newState);
    prevState = newState;
  }

  return result;
}

function transform(prevState, action) {
  switch (action.type) {
    case 'clear':
      return {};

    case 'addProperties':
      return {
        ...prevState,
        ...action.extraData,
      };

    case 'removeProperties':
      const newState = { ...prevState };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }

      return newState;
  }
}

module.exports = transformStateWithClones;
