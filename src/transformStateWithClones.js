'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const result = [];
  const addProp = 'addProperties';
  const removeProp = 'removeProperties';
  const clear = 'clear';

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case addProp:
        Object.assign(stateClone, extraData);
        break;

      case removeProp:
        for (const key of keysToRemove) {
          delete stateClone[key];
        }
        break;

      case clear:
        stateClone = {};
        break;
    }
    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
