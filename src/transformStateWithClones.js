'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
*/

function transformStateWithClones(state, action) {
  let copyState = { ...state };
  const arrState = [];

  for (const actions of action) {
    switch (actions.type) {
      case 'addProperties': {
        Object.assign(copyState, actions.extraData);
        break;
      }

      case 'removeProperties': {
        actions.keysToRemove.forEach((key) => delete copyState[key]);
        break;
      }

      case 'clear': {
        copyState = {};
        break;
      }
    }

    arrState.push({ ...copyState });
  }

  return arrState;
}

module.exports = transformStateWithClones;
