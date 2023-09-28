'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ('addProperties'):
        Object.assign(stateCopy, action.extraData);
        resultArr.push({ ...stateCopy });

        break;

      case ('removeProperties'):
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        resultArr.push({ ...stateCopy });

        break;

      case ('clear'):
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }
        resultArr.push({ ...stateCopy });

        break;
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
