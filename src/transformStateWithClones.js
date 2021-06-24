'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let copy = { ...state };
  let fixedCopy = {};

  for (const action of actions) {
    switch (action.type) {
      case ('addProperties'):
        copy = Object.assign(copy, action.extraData);

        fixedCopy = { ...copy };

        result.push(fixedCopy);
        break;

      case ('removeProperties'):
        for (const key of action.keysToRemove) {
          if (copy.hasOwnProperty(key)) {
            delete copy[key];
          }
        }

        fixedCopy = { ...copy };

        result.push(fixedCopy);
        break;

      case ('clear'):
        for (const key in copy) {
          delete copy[key];
        }

        fixedCopy = { ...copy };

        result.push(fixedCopy);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
