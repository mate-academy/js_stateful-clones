'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let tempState = {
    ...state,
  };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      tempState = Object.assign(tempState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const removeKey of action.keysToRemove) {
        delete tempState[removeKey];
      }
    } else if (action.type === 'clear') {
      for (const el in tempState) {
        delete tempState[el];
      }
    }

    history.push({ ...tempState });
  }

  return history;
}

module.exports = transformStateWithClones;
