'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function copyStateAndPush(Obj, arr) {
  const copyObj = { ...Obj };

  arr.push(copyObj);
}

function transformStateWithClones(state, actions) {
  const historyArray = [];
  let copyState = { ...state };

  for (const act in actions) {
    if (actions[act].type === 'addProperties') {
      const commandData = actions[act].extraData;

      Object.assign(copyState, commandData);

      copyStateAndPush(copyState, historyArray);
      continue;
    }

    if (actions[act].type === 'removeProperties') {
      const commandData = actions[act].keysToRemove;

      for (const removeData of commandData) {
        delete copyState[removeData];
      }
      copyStateAndPush(copyState, historyArray);
      continue;
    }

    if (actions[act].type === 'clear') {
      copyState = {};
      copyStateAndPush(copyState, historyArray);
      continue;
    }
  }

  return historyArray;
}

module.exports = transformStateWithClones;
