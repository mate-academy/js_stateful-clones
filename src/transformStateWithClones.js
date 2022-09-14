'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionValue = [];
  let newState = { ...state };
  const arr = [];

  for (let i = 0; i < actions.length; i++) {
    actionValue[i] = actions[i].type;
  }

  for (let i = 0; i < actionValue.length; i++) {
    switch (actionValue[i]) {
      case 'addProperties':
        Object.assign(newState, actions[i].extraData);
        break;

      case 'clear':
        newState = {};
        break;

      case 'removeProperties':
        const remProp = actions[i].keysToRemove;

        for (let j = 0; j < remProp.length; j++) {
          const t = remProp[j];

          delete newState[t];
        }
    }
    arr.push({ ...newState });
  }

  return arr;
}

module.exports = transformStateWithClones;
