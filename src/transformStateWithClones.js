'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateNew = { ...state };
  const result = [];

  for (const action of actions) {
    transform(stateNew, action, result);
  }

  return result;
}

function transform(stateNew, action, result) {
  switch (action.type) {
    case 'addProperties':
      Object.assign(stateNew, action.extraData);
      break;

    case 'removeProperties': {
      for (const key of action.keysToRemove) {
        delete stateNew[key];
      }

      break;
    }

    case 'clear': {
      for (const key of Object.keys(stateNew)) {
        delete stateNew[key];
      }

      break;
    }

    default: {
      throw new Error('Incorrect action type');
    }
  }

  result.push({ ...stateNew });
}

module.exports = transformStateWithClones;
