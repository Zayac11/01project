type SidebarPageType = {
    id: string,
    name: string
}

let initialState = {
    sidebarPage: [
        {id: '1', name: 'Oleg'},
        {id: '2', name: 'Andrew'},
        {id: '3', name: 'Artem'}
    ] as Array<SidebarPageType>,
};

export type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action:any):InitialStateType => {

    return state;
}
export default sidebarReducer;
