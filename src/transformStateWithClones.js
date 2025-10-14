'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prevState = { ...state };
  const result = [];

  for (const act of actions) {
    if (act.type === 'clear') {
      prevState = {};
    } else if (act.type === 'addProperties') {
      prevState = { ...prevState, ...act.extraData };
    } else if (act.type === 'removeProperties') {
      const newState = { ...prevState };

      for (const keys of act.keysToRemove) {
        delete newState[keys];
      }
      prevState = newState;
    }
    result.push(prevState);
  }

  return result;
}

module.exports = transformStateWithClones;
