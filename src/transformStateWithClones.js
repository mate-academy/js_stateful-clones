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
  const clearing = 'clear';
  let newState = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case add:
        Object.assign(newState, action.extraData);
        arr.push({ ...newState });
        break;

      case remove:
        for (const key of action.keysToRemove) {
          delete newState[key];
        };
        arr.push({ ...newState });
        break;

      case clearing:
        newState = {};
        arr.push({});
        break;
    };
  };

  return arr;
}

module.exports = transformStateWithClones;
