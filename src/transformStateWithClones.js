'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    transform(stateCopy, action);
    result.push(Object.assign({}, stateCopy));
  }

  return result;
}

function transform(stateCopy, action) {
  switch (action.type) {
    case 'addProperties':
      Object.assign(stateCopy, action.extraData);
      break;

    case 'removeProperties': {
      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }

      break;
    }

    case 'clear': {
      for (const key of Object.keys(stateCopy)) {
        delete stateCopy[key];
      }

      break;
    }
  }
}

module.exports = transformStateWithClones;
