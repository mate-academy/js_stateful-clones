'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newStates = [];
  const copiedObject = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties': {
        Object.assign(copiedObject, obj.extraData);

        break;
      }

      case 'removeProperties': {
        for (const key of obj.keysToRemove) {
          delete copiedObject[key];
        }

        break;
      }

      case 'clear': {
        for (const newKey of Object.keys(copiedObject)) {
          delete copiedObject[newKey];
        }

        break;
      }
    }

    newStates.push(Object.assign({}, copiedObject));
  }

  return newStates;
}

module.exports = transformStateWithClones;
