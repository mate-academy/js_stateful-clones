'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let currentState = state;

  function repeator(stateCopy) {
    result.push(stateCopy);
    currentState = stateCopy;
  }

  for (const obj of actions) {
    const stateCopy = { ...currentState };
    const action = obj.type;
    const plus = obj.extraData;
    const minus = obj.keysToRemove;

    switch (action) {
      case 'addProperties':
        Object.assign(stateCopy, plus);
        repeator(stateCopy);
        break;
      case 'removeProperties':
        for (const key of minus) {
          delete stateCopy[key];
        }
        repeator(stateCopy);
        break;
      case 'clear':
        for (const key1 in stateCopy) {
          delete stateCopy[key1];
        }
        repeator(stateCopy);
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
