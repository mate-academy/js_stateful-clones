'use strict';

function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;
      case 'removeProperties':
        cloneState = { ...cloneState };

        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        break;
      case 'clear':
        cloneState = {};
        break;
    }
    history.push({ ...cloneState });
  }

  return history;
}

module.exports = transformStateWithClones;
