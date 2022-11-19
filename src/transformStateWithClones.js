'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clone = [];
  const copyState = { ...state };
  let copy = {};

  actions.forEach(action => {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        copy = Object.assign(copyState, extraData);
        break;
      case 'removeProperties':
        keysToRemove.forEach(key => delete copyState[key]);
        copy = copyState;
        break;
      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        copy = copyState;
        break;
    }

    clone.push({ ...copy });
  });

  return clone;
}

module.exports = transformStateWithClones;
