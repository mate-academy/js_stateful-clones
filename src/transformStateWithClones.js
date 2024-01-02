'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const modifyObjects = [];
  let copyState = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        for (const [name, prop] of Object.entries(obj.extraData)) {
          copyState[name] = prop;
        }
        break;

      case 'removeProperties':
        for (const redundant of obj.keysToRemove) {
          delete copyState[redundant];
        }
        break;

      case 'clear':
        copyState = {};
        break;
    }

    modifyObjects.push({ ...copyState });
  }

  return modifyObjects;
}

module.exports = transformStateWithClones;
