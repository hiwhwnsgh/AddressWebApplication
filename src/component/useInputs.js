function reducer(state, action) {
switch (action.type) {
    case 'INPUTS_CHANGE':
    return {
        ...state,
        [action.name] : action.value,
    };
    default:
    return state;
}
}
export default reducer