'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

// write code here
function transformStateWithClones(state, actions) {
  const resAction = [];
  let tempState = { ...state };

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(tempState, act.extraData);
        break;
      case 'removeProperties':
        for (const removeKeys of act.keysToRemove) {
          delete tempState[removeKeys];
        };
        break;
      case 'clear':
        tempState = {};
    }
    resAction.push({ ...tempState });
  }

  return resAction;
}

module.exports = transformStateWithClones;
