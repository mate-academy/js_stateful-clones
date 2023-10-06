'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let statedCopy = { ...state };
  const addProp = 'addProperties';
  const removeProp = 'removeProperties';
  const clear = 'clear';
  const actionsResult = [];

  for (const action of actions) {
    switch (action.type) {
      case addProp:
        Object.assign(statedCopy, action.extraData);
        break;

      case removeProp:
        for (const key of action.keysToRemove) {
          delete statedCopy[key];
        }
        break;

      case clear:
        statedCopy = {};
    }

    actionsResult.push({ ...statedCopy });
  }

  return actionsResult;
}

module.exports = transformStateWithClones;
