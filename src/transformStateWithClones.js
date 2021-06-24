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
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ('addProperties'):
        Object.assign(stateCopy, action.extraData);

        break;

      case ('removeProperties'):
        for (const key of action.keysToRemove) {
          if (stateCopy.hasOwnProperty(key)) {
            delete stateCopy[key];
          }
        }

        break;

      case ('clear'):
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
    }

    clones.push({ ...stateCopy });
  }

  return clones;
}

module.exports = transformStateWithClones;
