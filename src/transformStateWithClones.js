'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const objectInResult = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(objectInResult, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      const remove = actions[i].keysToRemove;

      for (let keyRm = 0; keyRm < remove.length; keyRm++) {
        if (objectInResult.hasOwnProperty(remove[keyRm])) {
          delete objectInResult[remove[keyRm]];
        }
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in objectInResult) {
        delete objectInResult[key];
      }
    }

    const copy = { ...objectInResult };

    result.push(copy);
  }

  return result;
}

module.exports = transformStateWithClones;
