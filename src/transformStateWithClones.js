'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
    const stateHistory = [];
    let currentState = { ...state };

    for (const action of actions) {
        const newState = { ...currentState };

        switch (action.type) {
            case 'clear':
                currentState = {};
                break;
            case 'addProperties':
                Object.assign(newState, action.extraData);
                currentState = newState;
                break;
            case 'removeProperties':
                action.keysToRemove.forEach(key => {
                    delete newState[key];
                });
                currentState = newState;
                break;
            default:
                break;
        }

        stateHistory.push(currentState);
    }

    return stateHistory;
}


module.exports = transformStateWithClones;
