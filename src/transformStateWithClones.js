'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
'use strict';

function transformStateWithClones(state, actions) {
  const states = [];

  for (const action of actions) {
    let newState;

    if (action.type === 'addProperties') {
      const lastState = states.length ? states[states.length - 1] : state;
      newState = { ...lastState };
      for (const key in action.extraData) {
        newState[key] = action.extraData[key];
      }

    } else if (action.type === 'removeProperties') {
      const lastState = states.length ? states[states.length - 1] : state;
      newState = { ...lastState };
      for (const key of action.keysToRemove) {
        delete newState[key];
      }

    } else if (action.type === 'clear') {
      newState = {};
    }

    states.push(newState);
  }

  return states;
}

module.exports = transformStateWithClones;


