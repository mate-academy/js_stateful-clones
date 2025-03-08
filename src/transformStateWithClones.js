'use strict';

function transformStateWithClones(stateInput, actionsInput) {
  const stateHistory = [];
  let updatedState = { ...stateInput };

  for (const action of actionsInput) {
    if (action.type === 'addProperties') {
      updatedState = { ...updatedState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => {
        if (key in updatedState) {
          delete updatedState[key];
        }
      });
    } else if (action.type === 'clear') {
      updatedState = {};
    }

    stateHistory.push({ ...updatedState });
  }

  return stateHistory;
}

// Exemplo de uso:
const state = {
  foo: 'bar',
  name: 'Alice',
  country: 'USA',
};

const actions = [
  { type: 'addProperties', extraData: { age: 25, city: 'NY' } },
  { type: 'removeProperties', keysToRemove: ['foo', 'city'] },
  { type: 'clear' },
];

transformStateWithClones(state, actions);
