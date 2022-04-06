'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  let objBox = {};
  let objBox2 = {};

  for (const key in state) {
    objBox2[key] = state[key];
  }

  for (let i = 0; i < actions.length; i++) {
    objBox = {};

    for (const key in objBox2) {
      objBox[key] = objBox2[key];
    }

    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        objBox[key] = actions[i].extraData[key];
      }

      arr.push(objBox);
      objBox2 = objBox;
    } else if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        if (!objBox[key]) {
          continue;
        }

        delete objBox[key];
      }

      arr.push(objBox);
      objBox2 = objBox;
    } else if (actions[i].type === 'clear' && Object.keys(state).length !== 0) {
      for (const keyOfState in objBox) {
        delete objBox[keyOfState];
      }

      arr.push(objBox);
      objBox2 = objBox;
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
