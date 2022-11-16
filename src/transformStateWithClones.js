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
    switch (true) {
      case action.type === 'addProperties':
        copy = Object.assign(copyState, action.extraData);
        clone.push({ ...copy });
        break;
      case action.type === 'removeProperties':
        action.keysToRemove.forEach(remove => {
          for (const value in copyState) {
            if (value === remove) {
              delete copyState[value];
            }
          }
        });
        copy = copyState;
        clone.push({ ...copy });
        break;
      case action.type === 'clear':
        for (const value in copyState) {
          delete copyState[value];
        }
        copy = copyState;
        clone.push({ ...copy });
        break;
    }
  });

  return clone;
}

module.exports = transformStateWithClones;
