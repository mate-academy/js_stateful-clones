'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const state = {
  foo: 'bar',
  name: 'Jim',
  another: 'one',
};

console.log(
  transformStateWithClones(state, [
    {
      type: 'removeProperties',
      keysToRemove: ['another'],
    },
    { type: 'clear' },
    { type: 'clear' },
    { type: 'clear' },
    {
      type: 'addProperties',
      extraData: { yet: 'another property' },
    },
    { type: 'clear' },
    {
      type: 'addProperties',
      extraData: {
        foo: 'bar',
        name: 'Jim',
      },
    },
    {
      type: 'removeProperties',
      keysToRemove: ['name', 'hello'],
    },
  ]),
);

function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const stateHistory = [];

  for (const actionObj of actions) {
    // actionObj.type consists of addProperties, removeProperties, clear
    switch (actionObj.type) {
      case 'addProperties':
        Object.assign(stateClone, actionObj.extraData);
        stateHistory.push({ ...stateClone });
        break;
      case 'removeProperties':
        for (const key of actionObj.keysToRemove) {
          delete stateClone[key];
        }
        stateHistory.push({ ...stateClone });
        break;
      case 'clear':
        stateClone = Object.fromEntries([]);
        stateHistory.push({});
        break;
      default:
    }
  }
  return stateHistory;
}

module.exports = transformStateWithClones;
