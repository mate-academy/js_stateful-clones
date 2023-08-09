'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const add = 'addProperties';
  const remove = 'removeProperties';
  const clear = 'clear';
  let newState = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case add:
        Object.assign(newState, action.extraData);
        break;

      case remove:
        for (const key of action.keysToRemove) {
          delete newState[key];
        };
        break;

      case clear:
        newState = {};
        break;
    };

    arr.push({ ...newState });
  };

  return arr;
}

module.exports = transformStateWithClones;
