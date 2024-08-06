'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

let currentState = deepClone(state);
const stateHistory = [];

for (const action of actions) {
    switch (action.type) {
        case 'clear':
            currentState = {};
            break;
        case 'addProperties':
            currentState = {
                ...currentState,
                ...action.extraData,
            };
            break;
        case 'removeProperties':
            currentState = { ...currentState };
            for (const key of action.keysToRemove) {
                delete currentState[key];
            }
            break;
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push(deepClone(currentState));
}

return stateHistory;
}

module.exports = transformStateWithClones;
