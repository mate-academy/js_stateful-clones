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

    switch (true) {
      case type === 'addProperties':
        copy = Object.assign(copyState, extraData);
        clone.push({ ...copy });
        break;
      case type === 'removeProperties':
        keysToRemove.forEach(key => delete copyState[key]);
        copy = copyState;
        clone.push({ ...copy });
        break;
      case type === 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        copy = copyState;
        clone.push({ ...copy });
        break;
    }
  });

  return clone;
}

module.exports = transformStateWithClones;
