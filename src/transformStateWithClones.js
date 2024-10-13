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
  let changeState = stateCopy;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        {
          const addState = Object.assign({}, changeState, action.extraData);

          result.push(addState);
          changeState = addState;
        }
        break;

      case 'removeProperties':
        {
          const arr = action.keysToRemove;
          const removeState = { ...changeState };

          for (const ch of arr) {
            delete removeState[ch];
          }

          result.push(removeState);
          changeState = removeState;
        }
        break;

      case 'clear':
        {
          const clearState = { ...changeState };

          for (const key in clearState) {
            delete clearState[key];
          }

          result.push(clearState);
          changeState = clearState;
        }
        break;

      default:
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
