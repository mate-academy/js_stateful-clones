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

  for (const object of actions) {
    let cloneCopy = Object.assign({}, clone);

    const type = object.type;
    const propertiesToRemove = object.keysToRemove;

    if (type === 'addProperties') {
      Object.assign(cloneCopy, object.extraData);
    }

    if (type === 'removeProperties') {
      for (const key of propertiesToRemove) {
        if (clone.hasOwnProperty(key)) {
          delete cloneCopy[key];
        }
      }
    }

    if (type === 'clear') {
      cloneCopy = {};
    }

    clone = cloneCopy;
    clones.push(cloneCopy);
  }

  return clones;
}

module.exports = transformStateWithClones;
