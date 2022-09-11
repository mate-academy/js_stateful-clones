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
          const deletePropertie = action.keysToRemove[i];

          delete copy[deletePropertie];
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
    }
  }

  return result;
}

module.exports = transformStateWithClones;
