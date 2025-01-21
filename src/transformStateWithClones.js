'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allClones = [];
  const CLONE = { ...state };
  let savedClone = { ...CLONE };

  for (const a of actions) {
    let newClone = { ...savedClone };

    switch (a.type) {
      case 'addProperties':
        Object.assign(newClone, a.extraData);
        break;

      case 'removeProperties':
        for (let i = 0; i < a.keysToRemove.length; i++) {
          Reflect.deleteProperty(newClone, a.keysToRemove[i]);
        }
        break;

      case 'clear':
        newClone = {};

        break;
    }

    allClones.push(newClone);
    savedClone = { ...newClone };
  }

  return allClones;
}

module.exports = transformStateWithClones;
