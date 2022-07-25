'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const rezult = [];

  for (const key of actions) {
    let objForTransform = { ...stateClone };

    switch (key.type) {
      case 'addProperties': {
        Object.assign(objForTransform, key.extraData);
        break;
      }

      case 'removeProperties': {
        for (const keysDelete of key.keysToRemove) {
          delete objForTransform[keysDelete];
        }
        break;
      }

      case 'clear': {
        objForTransform = {};
      }
    }

    stateClone = objForTransform;
    rezult.push(stateClone);
  }

  return rezult;
}

module.exports = transformStateWithClones;
