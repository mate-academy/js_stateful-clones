'use strict';

function transform(prevState, action) {
  switch (action.type) {
    case 'addProperties':
      return {
        ...prevState,
        ...action.extraData,
      };

    case 'removeProperties': {
      const newState = { ...prevState };

      for (const key of action.keysToRemove) {
        if (Object.keys(newState).includes(key)) {
          delete newState[key];
        }
      }

      return newState;
    }

    case 'clear':
      return {};

    default:
      return { ...prevState };
  }
}
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const history = [];
  let prevState = { ...state };

  for (const action of actions) {
    const newState = transform(prevState, action);

    history.push(newState);
    prevState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
