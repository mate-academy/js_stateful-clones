'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copy = { ...state };

  for (const action of actions) {
    let resultObject = { ...copy };

    switch (action.type) {
      case ('addProperties'):
        Object.assign(copy, action.extraData);

        resultObject = { ...copy };

        result.push(resultObject);

        break;

      case ('removeProperties'):
        for (let i = 0; i < action.keysToRemove.length; i++) {
          const propertieToDelete = action.keysToRemove[i];

          delete copy[propertieToDelete];
        };

        resultObject = { ...copy };

        result.push(resultObject);

        break;

      case ('clear'):
        for (const key in copy) {
          delete copy[key];
        };

        resultObject = { ...copy };

        result.push(resultObject);

        break;

      default:
        return 'Error';
    }
  }

  return result;
}

module.exports = transformStateWithClones;
