'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];

  for (let index = 0; index < actions.length; index++) {
    const action = actions[index];
    let newState;
    const prevState = states[index - 1] || state;

    if (action.type === 'addProperties') {
      newState = {
        ...prevState,
        ...action.extraData,
      };
    }

    if (action.type === 'removeProperties') {
      newState = { ...prevState };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    }

    if (action.type === 'clear') {
      newState = {};
    }

    states.push(newState);
  }

  return states;
}

module.exports = transformStateWithClones;
