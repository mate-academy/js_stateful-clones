'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  const stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        array.push({ ...stateClone });
        break;

      case 'removeProperties':
        for (const character of action.keysToRemove) {
          if (stateClone.hasOwnProperty(character)) {
            delete stateClone[character];
          }
        }
        array.push({ ...stateClone });
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        array.push({ ...stateClone });
        break;
    }
  }

  return array;
}

module.exports = transformStateWithClones;
