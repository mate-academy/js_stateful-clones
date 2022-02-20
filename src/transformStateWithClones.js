'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clones = [];
  const newObj = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties': {
        Object.assign(newObj, actions[i].extraData);

        const cloneObject = { ...newObj };

        clones.push(cloneObject);
        break;
      }

      case 'removeProperties': {
        for (const key in actions[i].keysToRemove) {
          delete newObj[actions[i].keysToRemove[key]];
        }

        const cloneObject = { ...newObj };

        clones.push(cloneObject);
        break;
      }

      case 'clear': {
        for (const key in newObj) {
          delete newObj[key];
        }

        const cloneObject = { ...newObj };

        clones.push(cloneObject);
        break;
      }
    }
  }

  return clones;
}

module.exports = transformStateWithClones;
