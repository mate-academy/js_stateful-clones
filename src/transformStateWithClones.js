'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateArray = [];

  for (const action of actions) {
    transform(stateCopy, action);

    const varState = { ...stateCopy };

    stateArray.push(varState);
  }

  return stateArray;
}

function transform(state, action) {
  const varAction = action.type;

  switch (varAction) {
    case 'addProperties':
      Object.assign(state, action.extraData);
      break;

    case 'removeProperties': {
      for (const key of action.keysToRemove) {
        delete state[key];
      }
      break;
    }

    case 'clear': {
      for (const key of Object.keys(state)) {
        delete state[key];
      }
      break;
    }
  }
}

module.exports = transformStateWithClones;
