'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionV = [];
  let newState = { ...state };
  const arr = [];
  let temp;

  for (let i = 0; i < actions.length; i++) {
    actionV[i] = actions[i].type;
  }

  for (let i = 0; i < actionV.length; i++) {
    if (actionV[i] === 'addProperties') {
      Object.assign(newState, actions[i].extraData);
      temp = { ...newState };
      arr.push(temp);
    }

    if (actionV[i] === 'clear') {
      newState = {};
      temp = { ...newState };
      arr.push(temp);
    }

    if (actionV[i] === 'removeProperties') {
      const remProp = actions[i].keysToRemove;

      for (let j = 0; j < remProp.length; j++) {
        const t = remProp[j];

        delete newState[t];
      }

      temp = { ...newState };
      arr.push(temp);
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
