'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayState = [];
  let newState = { ...state };

  actions.forEach((action) => {
    let copyNewState = { ...newState };

    switch (action.type) {
      case 'addProperties':
        for (const prop in action.extraData) {
          Object.assign(copyNewState, { [prop]: action.extraData[prop] });
        }
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete copyNewState[keyToRemove];
        }
        break;

      case 'clear':
        copyNewState = {};
        break;
    }

    arrayState.push(copyNewState);
    newState = { ...copyNewState };
  });

  return arrayState;
}

module.exports = transformStateWithClones;
