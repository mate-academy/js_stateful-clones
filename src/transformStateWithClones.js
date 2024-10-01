'use strict';

/**
* @param {Object} state
* @param {Object[]} actions
*
* @return {Object[]}
*/
function transformStateWithClones(state, actions) {
const stateHistory = [];
actions.forEach((action) => {
switch (action.type) {
case 'addProperties':
const addState = {...state};
Object.keys(action.extraData).forEach(key => {
addState[key] = action.extraData[key];
});
stateHistory.push(addState);
break;

case 'removeProperties':
const removeState = {...state};
for (const key of action.keysToRemove) {
delete removeState[key];
};
stateHistory.push(removeState);
break;

case 'clear':
const clearState = {...state};
Object.keys(state).forEach(key => delete state[key]);
stateHistory.push(clearState);
};
});
return stateHistory;
}

module.exports = transformStateWithClones;
