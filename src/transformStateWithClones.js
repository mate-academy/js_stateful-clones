'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let myState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'clear') {
      myState = {};
      result.push({});
    } else if (actions[i].type === 'addProperties') {
      myState = {
        ...myState,
        ...actions[i].extraData,
      };
      result.push({ ...myState });
    } else if (actions[i].type === 'removeProperties') {
      actions[i].keysToRemove.forEach(e => delete myState[e]);
      result.push({ ...myState });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
