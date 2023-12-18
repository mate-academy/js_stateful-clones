'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const initialStateCopy = { ...state };

  const resultArray = [];

  const applyAction = (currentState, action) => {
    const currentStateCopy = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(currentStateCopy, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete currentStateCopy[key];
        });
        break;
      case 'clear':
        return {};
      default:
        break;
    }

    return currentStateCopy;
  };

  actions.reduce((currentState, action) => {
    const nextState = applyAction(currentState, action);

    resultArray.push(nextState);

    return nextState;
  }, initialStateCopy);

  return resultArray;
}

module.exports = transformStateWithClones;
