'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const stateArr = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const st = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          st[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        for (let j = 0; j < action.keysToRemove.length; j++) {
          const key = action.keysToRemove[j];

          delete st[key];
        }
        break;
      case 'clear':
        for (const key in st) {
          delete st[key];
        }
        break;
      default:
        break;
    }

    currentState = st;
    stateArr.push(st);
  }

  return stateArr;
}

module.exports = transformStateWithClones;
