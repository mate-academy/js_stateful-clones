'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let newState = {
    ...state,
  };
  const addProp = 'addProperties';
  const removeProp = 'removeProperties';
  const clear = 'clear';

  for (const item of actions) {
    if (item.type === addProp) {
      newState = {
        ...newState, ...item.extraData,
      };
    }

    if (item.type === removeProp) {
      for (const keys of item.keysToRemove) {
        delete newState[keys];
      }
    }

    if (item.type === clear) {
      for (const keys in newState) {
        delete newState[keys];
      }
    }

    res.push({
      ...newState,
    });
  }

  return res;
}

module.exports = transformStateWithClones;
