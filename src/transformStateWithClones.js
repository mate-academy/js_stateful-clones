'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const objectClones = [];
  const clone = {
    ...state,
  };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const value in action.extraData) {
          clone[value] = action.extraData[value];
        }
        break;
      case 'removeProperties':
        for (const value of action.keysToRemove) {
          delete clone[value];
        }
        break;
      case 'clear':
        for (const value in clone) {
          delete clone[value];
        }
        break;
    }

    const cloneMirror = {};

    for (const key in clone) {
      cloneMirror[key] = clone[key];
    }

    objectClones.push(cloneMirror);
  }

  return objectClones;
}

module.exports = transformStateWithClones;
