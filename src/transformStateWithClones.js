'use strict';

/**
* @param {Object} state
* @param {Object[]} actions
*
* @return {Object[]}
*/
function transformStateWithClones(state, actions) {
const stateHistory = [];
// deep-cloning the initial state
let currentState = structuredClone(state);

actions.forEach((action) => {
switch (action.type) {
case 'addProperties':
  // clone the current state and add the new props
currentState = structuredClone(currentState);
Object.keys(action.extraData).forEach(key => {
addState[key] = action.extraData[key];
});
stateHistory.push(currentState);
break;

case 'removeProperties':
  // clone the current state and remove the specified keys
currentState = structuredClone(currentState);
for (const key of action.keysToRemove) {
delete removeState[key];
};
stateHistory.push(currentState);
break;

case 'clear':
  // replace current state with an empty object
currentState = {};
stateHistory.push(currentState);
break;
};
});
return stateHistory;
}

module.exports = transformStateWithClones;
