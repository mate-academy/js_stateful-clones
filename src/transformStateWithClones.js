'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let tempState = structuredClone(state);

  const afterStates = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      const newTempState = structuredClone(tempState);

      // Object.assign(tempObj, actions[i].extraData);
      for (const key in actions[i].extraData) {
        newTempState[key] = actions[i].extraData[key];
      }
      afterStates.push(newTempState);
      tempState = structuredClone(newTempState);
    } else if (actions[i].type === 'removeProperties') {
      const newTempState = structuredClone(tempState);

      for (const key of actions[i].keysToRemove) {
        delete newTempState[key];
      }
      afterStates.push(newTempState);
      tempState = structuredClone(newTempState);
    } else if (actions[i].type === 'clear') {
      const newTempState = structuredClone(tempState);

      for (const key in newTempState) {
        delete newTempState[key];
      }
      afterStates.push(newTempState);
      tempState = structuredClone(newTempState);
    }
  }

  return afterStates;
}

module.exports = transformStateWithClones;
