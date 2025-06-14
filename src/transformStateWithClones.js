'transformStateWithClones';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalstate = [];
  let currentState = { ...state };

  for (const act of actions) {
    if (act.type === 'addProperties') {
      currentState = { ...currentState, ...act.extraData };
    }

    const DState = { ...currentState };

    if (act.type === 'removeProperties') {
      for (const sas of act.keysToRemove) {
        if (sas in DState) {
          delete DState[sas];
        }
      }
      currentState = DState;
    }

    if (act.type === 'clear') {
      currentState = {};
    }

    finalstate.push({ ...currentState });
  }

  return finalstate;
}

module.exports = transformStateWithClones;
