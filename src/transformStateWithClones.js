'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  let currentState = { ...state };

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        currentState = { ...currentState, ...object.extraData };
        clones.push(currentState);
        break;
      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of object.keysToRemove) {
          delete currentState[key];
        }
        clones.push(currentState);
        break;
      case 'clear':
        currentState = {};
        clones.push(currentState);
        break;
    }
  }

  return clones;
}

module.exports = transformStateWithClones;
