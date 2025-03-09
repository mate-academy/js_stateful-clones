'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  actions.forEach((action) => {
    const stateCopy = { ...currentState };

    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        currentState = stateCopy;
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete stateCopy[key]);
        currentState = stateCopy;
        break;
    }

    history.push({ ...currentState });
  });

  return history;
}

module.exports = transformStateWithClones;
