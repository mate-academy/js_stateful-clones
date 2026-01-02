'use strict';

/**
 * @param {Object} cloneState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const cloneState = Object.assign({}, state);

  for (const act of actions) {
    if (act.type === 'addProperties') {
      Object.assign(cloneState, act.extraData);
      stateHistory.push({ ...cloneState });
    }

    if (act.type === 'removeProperties') {
      for (const k of act.keysToRemove) {
        delete cloneState[k];
      }
      stateHistory.push({ ...cloneState });
    }

    if (act.type === 'clear') {
      for (const key in cloneState) {
        delete cloneState[key];
      }
      stateHistory.push({ ...cloneState });
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

const data = [
  {
    state: {
      foo: 'bar',
      bar: 'foo',
      name: 'Jim',
      hello: 'world',
    },
    actions: [
      {
        type: 'removeProperties',
        keysToRemove: ['test', 'bar'],
      },
    ],
  },
];

for (const i of data) {
  transformStateWithClones(i.state, i.actions);
}
