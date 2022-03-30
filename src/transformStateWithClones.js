'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const firstState = { ...state };
  const changeState = [];

  function assigned(index, to, from) {
    changeState[index] = Object.assign(to, from);
  }

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        firstState[key] = actions[i].extraData[key];
      }
      assigned(i, {}, firstState);
    } else if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete firstState[key];
      }
      assigned(i, {}, firstState);
    } else if (actions[i].type === 'clear') {
      for (const key in firstState) {
        delete firstState[key];
      }
      assigned(i, {}, firstState);
    }
  }

  return changeState;
}

module.exports = transformStateWithClones;
