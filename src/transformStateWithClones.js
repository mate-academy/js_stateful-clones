'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  let clone = {
    ...state,
  };

  for (const action of actions) {
    let cloneCopy = Object.assign({}, clone);

    const { type, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(cloneCopy, action.extraData);
        break;

      case 'removeProperties' :
        for (const key of keysToRemove) {
          if (clone.hasOwnProperty(key)) {
            delete cloneCopy[key];
          }
        }
        break;

      case 'clear': cloneCopy = {};
        break;

      default: break;
    }

    clone = cloneCopy;
    clones.push(cloneCopy);
  }

  return clones;
}

module.exports = transformStateWithClones;
