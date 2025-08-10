'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const copy = { ...state }; // копія state
  let currentState = { ...copy };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const addCopy = { ...currentState };
        const addProperti = Object.assign({}, addCopy, action.extraData);

        currentState = addProperti;
        history.push(addProperti);
        break;

      case 'removeProperties':
        const removeCopy = { ...currentState };

        for (const key of action.keysToRemove) {
          delete removeCopy[key];
        }
        currentState = removeCopy;
        history.push(removeCopy);
        break;

      case 'clear':
        const clearCopy = {};

        currentState = clearCopy;
        history.push(clearCopy);
        break;
    }
  }

  return history;
}

module.exports = transformStateWithClones;
