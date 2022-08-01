'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [ ];
  const copyState = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(copyState, obj.extraData);

        break;

      case 'removeProperties' :
        for (const key of obj.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        for (const value in copyState) {
          delete copyState[value];
        }
        break;
    }
    array.push({ ...copyState });
  }

  return array;
}

module.exports = transformStateWithClones;
