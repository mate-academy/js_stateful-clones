'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  let tempObj = {};
  let stateArray = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        stateCopy = {
          ...stateCopy,
          ...actions[i].extraData,
        };
        tempObj = { ...stateCopy };
        stateArray = [...stateArray, tempObj];
        break;

      case 'removeProperties':
        for (const item of actions[i].keysToRemove) {
          delete stateCopy[item];
        }
        stateArray = [...stateArray, stateCopy];
        break;

      case 'clear':
        stateCopy = {};
        stateArray = [...stateArray, stateCopy];
        break;
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
