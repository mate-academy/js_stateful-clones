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
  const copyState = { ...state };

  for (const act in actions) {
    const typeAction = Object.values(actions[act]);
    const commandData = typeAction[1];

    if (typeAction[0] === 'addProperties') {
      for (const data in commandData) {
        copyState[data] = commandData[data];
      }
      copyStateAndPush(copyState, historyArray);
      continue;
    }

    if (typeAction[0] === 'removeProperties') {
      for (const removeData in commandData) {
        const keyToDelete = commandData[removeData];

        delete copyState[keyToDelete];
      }
      copyStateAndPush(copyState, historyArray);
      continue;
    }

    if (typeAction[0] === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }
      copyStateAndPush(copyState, historyArray);
      continue;
    }
  }

  return historyArray;
}

module.exports = transformStateWithClones;
