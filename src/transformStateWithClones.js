'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = [];
  const finalState = [];

  newState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    for (const key in actions[i]) {
      if (actions[i][key] === 'addProperties') {
        Object.assign(newState, actions[i]['extraData']);
      };

      if (actions[i][key] === 'removeProperties') {
        for (const key1 in actions[i]['keysToRemove']) {
          delete newState[actions[i]['keysToRemove'][key1]];
        }
      }

      if (actions[i][key] === 'clear') {
        for (const key1 in newState) {
          delete newState[key1];
        };
      };
    };
    finalState[i] = { ...newState };
  };

  return finalState;
}

module.exports = transformStateWithClones;
