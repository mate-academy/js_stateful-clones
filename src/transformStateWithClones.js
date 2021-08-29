'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];
  const stateCopy = { ...state };
  let clone = {};

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        clone = { ...stateCopy };
        stateClones.push(clone);
        break;

      case 'removeProperties':
        const arr = action.keysToRemove;

        for (let i = 0; i < arr.length; i++) {
          for (const key in stateCopy) {
            if (arr[i] === key) {
              delete stateCopy[key];
            }
          }
        }
        clone = { ...stateCopy };
        stateClones.push(clone);
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        clone = { ...stateCopy };
        stateClones.push(clone);
        break;
    }
  }

  return stateClones;
}

module.exports = transformStateWithClones;
