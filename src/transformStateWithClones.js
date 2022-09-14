'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    let resultObject = { ...stateCopy };

    switch (action.type) {
      case ('addProperties'):
        Object.assign(stateCopy, action.extraData);

        resultObject = { ...stateCopy };

        break;

      case ('removeProperties'):
        const { keysToRemove } = action;

        for (let i = 0; i < action.keysToRemove.length; i++) {
          delete stateCopy[keysToRemove[i]];
        };

        resultObject = { ...stateCopy };

        break;

      case ('clear'):
        for (const key in stateCopy) {
          delete stateCopy[key];
        };

        resultObject = { ...stateCopy };

        break;

      default:
        return 'Error';
    }

    result.push(resultObject);
  }

  return result;
}

module.exports = transformStateWithClones;
