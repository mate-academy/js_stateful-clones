'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const userInput = { ...state };
  const logs = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(userInput, actions[i].extraData);
      logs.push({ ...userInput });
    } else if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete userInput[key];
      }
      logs.push({ ...userInput });
    } else if (actions[i].type === 'clear') {
      for (const key in userInput) {
        delete userInput[key];
      }
      logs.push({ ...userInput });
    }
  }

  return logs;
}

module.exports = transformStateWithClones;
