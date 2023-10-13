'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const stateArray = [];
  const addProperties = 'addProperties';
  const removeProperties = 'removeProperties';
  const clear = 'clear';

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case addProperties:
        stateCopy = {
          ...stateCopy,
          ...actions[i].extraData,
        };
        break;

      case removeProperties:
        for (const item of actions[i].keysToRemove) {
          delete stateCopy[item];
        }
        break;

      case clear:
        stateCopy = {};
        break;
    }

    stateArray.push({ ...stateCopy });
  }

  return stateArray;
}

module.exports = transformStateWithClones;
