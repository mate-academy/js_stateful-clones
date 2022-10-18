'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let removeProperty = '';
  let action = {};
  const newState = [];
  const newObject = { ...state };

  for (const key in actions) {
    action = actions[key];

    switch (action.type) {
      case 'addProperties':
        Object.assign(newObject, action.extraData);
        break;

      case 'removeProperties':
        for (const x in action.keysToRemove) {
          removeProperty = action.keysToRemove[x];

          delete newObject[removeProperty];
        }
        break;

      case 'clear':
        for (const y in newObject) {
          delete newObject[y];
        }
        break;
    }

    newState.push({ ...newObject });
  }

  return newState;
}

module.exports = transformStateWithClones;
