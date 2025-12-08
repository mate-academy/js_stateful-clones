'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
'use strict';

function transformStateWithClones(state, actions) {
  const history = [];

  let prevState = { ...state };

  for (const action of actions) {

    let nextState = { ...prevState };

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':

        nextState = { ...nextState, ...action.extraData };
        break;

      case 'removeProperties':
   
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      default:

        break;
    }


    history.push({ ...nextState });


    prevState = nextState;
  }

  return history;
}


module.exports = transformStateWithClones;
