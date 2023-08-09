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
  const copyState = { ...state };
  const resultA = [];

  for (const action of actions) {
    switch (action.type) {
      case clear:
        for (const clearKey in copyState) {
          delete copyState[clearKey];
        };
        break;

      case add:
        Object.assign(copyState, action.extraData);
        break;

      case remove:
        for (const removeKey of action.keysToRemove) {
          if (removeKey in copyState) {
            delete copyState[removeKey];
          };
        };
        break;
    };
    resultA.push({ ...copyState });
  };

  return resultA;
}

module.exports = transformStateWithClones;
