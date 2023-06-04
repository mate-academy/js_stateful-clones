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
    switch (action.type) {
      case 'removeProperties':
        const newState1 = removeProperties(prevState, action.keysToRemove);

        result.push(newState1);
        prevState = newState1;
        break;

      case 'addProperties':
        const newState2 = addProperties(prevState, action.extraData);

        result.push(newState2);
        prevState = newState2;
        break;

      case 'clear':
        const newState3 = clear();

        result.push(newState3);
        prevState = newState3;
        break;
    }
  }

  return result;
}

function addProperties(state, extraData) {
  const newState = {
    ...state, ...extraData,
  };

  return newState;
};

function removeProperties(state, keysToRemove) {
  const newState = {};

  for (const key in state) {
    if (!keysToRemove.includes(key)) {
      newState[key] = state[key];
    }
  }

  return newState;
};

function clear() {
  return {};
};

module.exports = transformStateWithClones;
