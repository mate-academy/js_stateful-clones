'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let copyState = { ...state };

  for (const obj of actions) {
    let buffState = { ...copyState };

    if (obj.type === 'addProperties') {
      Object.assign(buffState, obj.extraData);
    } else if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete buffState[key];
      }
    } else if (obj.type === 'clear') {
      buffState = {};
    }
    copyState = buffState;

    result.push(buffState);
  }

  return result;
}

module.exports = transformStateWithClones;
