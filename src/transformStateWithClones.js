'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedState = { ...state };
  const finalState = [];
  const deleteKey = (key) => delete clonedState[key];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(clonedState, obj.extraData);
        break;

      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          deleteKey(key);
        };
        break;

      case 'clear':
        for (const key of Object.keys(clonedState)) {
          deleteKey(key);
        };
        break;
    };

    finalState.push({ ...clonedState });
  };

  return finalState;
};

module.exports = transformStateWithClones;
