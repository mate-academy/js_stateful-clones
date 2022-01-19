'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const tempState = { ...state };
  const stateArr = [];

  for (const i in actions) {
    switch (actions[i].type) {
      case 'addProperties': {
        for (const ent of Object.entries(actions[i].extraData)) {
          tempState[ent[0]] = ent[1];
        }
        stateArr.push({ ...tempState });
        break;
      }

      case 'removeProperties': {
        for (const key of actions[i].keysToRemove) {
          delete tempState[key];
        }
        stateArr.push({ ...tempState });
        break;
      }

      case `clear`: {
        for (const key in tempState) {
          delete tempState[key];
        }
        stateArr.push({ ...tempState });
        break;
      }
    }
  }

  return stateArr;
}

module.exports = transformStateWithClones;
