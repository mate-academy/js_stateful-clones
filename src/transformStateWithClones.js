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
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
        throw new Error();
    }
    history.push(stateCopy);
    prevState = stateCopy;
  }

  return history;
}

module.exports = transformStateWithClones;
