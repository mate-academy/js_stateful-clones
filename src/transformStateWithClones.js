'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let prevState = state;

  for (let index = 0; index < actions.length; index++) {
    const action = actions[index];
    let newState;

    switch (action.type) {
      case 'addProperties':
        newState = {
          ...prevState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        newState = { ...prevState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        };
        break;

      case 'clear':
        newState = {};
        break;
    }

    prevState = newState;
    states.push(newState);
  }

  return states;
}

module.exports = transformStateWithClones;
