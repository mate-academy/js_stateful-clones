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
    const prewState = states[index - 1] || state;

    switch (action.type) {
      case 'addProperties':
        newState = {
          ...prewState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        newState = { ...prewState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;
    }

    states.push(newState);
  }

  return states;
}

module.exports = transformStateWithClones;
