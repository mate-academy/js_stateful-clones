'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let prevState = { ...state };

  for (const action of actions) {
    let stateCopy = { ...prevState };

    switch (action.type) {
      case 'addProperties':
        stateCopy = Object.assign(stateCopy, action.extraData);
        prevState = stateCopy;
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        prevState = stateCopy;
        break;
      case 'clear':
        prevState = {};
        break;
      default:
        throw new Error('Unsupported action type: ' + action.type);
    }
    history.push({ ...prevState });
  }

  return history;
}

module.exports = transformStateWithClones;
