'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentObject = { ...state };
  const clonesArray = [];

  for (const i in actions) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(currentObject, actions[i].extraData);
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete currentObject[key];
        }
        break;

      case 'clear':
        for (const key in currentObject) {
          delete currentObject[key];
        }
        break;
    }
    clonesArray.push({ ...currentObject });
  }

  return clonesArray;
}

module.exports = transformStateWithClones;
