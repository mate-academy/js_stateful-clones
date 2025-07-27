// src/transformStateWithClones.js

function transformStateWithClones(initialState, actions) {
  const result = [];
  let currentState = initialState;

  for (const action of actions) {
    const copiedState = { ...currentState };

    switch (action.type) {
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copiedState[key];
        }
        break;

      case 'clear':
        for (const key in copiedState) {
          delete copiedState[key];
        }
        break;

      case 'addProperties':
        Object.assign(copiedState, action.extraData);
        break;

      default:
        // Unknown action, skip or throw an error
        break;
    }

    result.push(copiedState);
    currentState = copiedState;
  }

  return result;
}

module.exports = transformStateWithClones;
