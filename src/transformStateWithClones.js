'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];

  for (const key in actions) {
    if (stateArray.length !== 0) {
      stateArray.push(transform(stateArray[key - 1], actions[key]));
      continue;
    }
    stateArray.push(transform(state, actions[key]));
  }

  return stateArray;
}

function transform(state, action) {
  const clone = Object.assign({}, state);

  switch (action.type) {
    case 'addProperties':
      Object.assign(clone, action.extraData);

      return clone;

    case 'removeProperties': {
      for (const key of action.keysToRemove) {
        delete clone[key];
      }

      return clone;
    }

    case 'clear': {
      for (const key of Object.keys(state)) {
        delete clone[key];
      }

      return clone;
    }
  }
}

module.exports = transformStateWithClones;
