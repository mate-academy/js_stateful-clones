'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newState = [];
  const clone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
    }

    for (const remove in action.keysToRemove) {
      switch (action.type) {
        case 'removeProperties':
          delete clone[action.keysToRemove[remove]];
      }
    }

    for (const key in clone) {
      switch (action.type) {
        case 'clear':
          delete clone[key];
      }
    }

    newState.push({ ...clone });
  }

  return newState;
}

module.exports = transformStateWithClones;
