'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const obj of actions) {
  switch(obj.type) {
    case 'clear' :
      currentState = {};
      break;

    case 'addProperties' :
      currentState = { ...currentState, ...obj.extraData };
      break;

    case 'removeProperties' :
      for (const x of obj.keysToRemove) {
        delete currentState[x];
      }
      break;
    }
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
