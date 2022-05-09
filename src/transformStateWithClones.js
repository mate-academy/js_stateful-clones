'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];
  let newObj = { ...state };

  for (const action of actions) {
    if (stateClones.length >= 1) {
      newObj = { ...stateClones[stateClones.length - 1] };
    }

    switch (action.type) {
      case 'addProperties':
        Object.assign(newObj, action.extraData);
        break;
      case 'removeProperties':
        for (const value of action.keysToRemove) {
          if (newObj.hasOwnProperty(value)) {
            delete newObj[value];
          }
        }
        break;
      case 'clear':
        for (const key in newObj) {
          delete newObj[key];
        }
        break;
    }

    stateClones.push({ ...newObj });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
