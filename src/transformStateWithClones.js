'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const arrayStateConditions = [];
  let stateNew = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        stateNew = { ...stateNew, ...action.extraData };
        break;
      }

      case 'removeProperties': {
        stateNew = { ...stateNew };

        for (const key of action.keysToRemove) {
          delete stateNew[key];
        }
        break;
      }

      case 'clear': {
        stateNew = {};
        break;
      }
    }

    arrayStateConditions.push(stateNew);
  }

  return arrayStateConditions;
}

module.exports = transformStateWithClones;
