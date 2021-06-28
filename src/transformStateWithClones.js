'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyState = { ...state };
  let saveChanges = [];
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    for (const key in actions[i]) {
      switch (true) {
        case actions[i][key] === 'addProperties':
          Object.assign(copyState, actions[i].extraData);

          saveChanges = {
            ...copyState,
            ...actions[i].extraData,
          };
          result.push(saveChanges);
          break;
        case actions[i][key] === 'removeProperties':
          for (let j = 0; j < (actions[i].keysToRemove).length; j++) {
            delete copyState[actions[i].keysToRemove[j]];
          }
          saveChanges = { ...copyState };
          result.push(saveChanges);
          break;
        case actions[i][key] === 'clear':
          for (const key2 in copyState) {
            delete copyState[key2];
          }
          saveChanges = { ...copyState };
          result.push(saveChanges);
          break;
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
