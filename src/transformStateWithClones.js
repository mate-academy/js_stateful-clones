'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const initialState = { ...state };
  const statesArr = [initialState];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const clonedState = { ...statesArr[statesArr.length - 1] };

      for (const key in action.extraData) {
        clonedState[key] = action.extraData[key];
      }
      statesArr.push(clonedState);
    } else if (action.type === 'removeProperties') {
      const clonedState = { ...statesArr[statesArr.length - 1] };

      for (const key of action.keysToRemove) {
        delete clonedState[key];
      }
      statesArr.push(clonedState);
    } else if (action.type === 'clear') {
      statesArr.push({});
    }
  }
  statesArr.shift();

  return statesArr;
}

module.exports = transformStateWithClones;
