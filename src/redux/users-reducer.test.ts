import usersReducer, {actions, InitialStateType} from "./users-reducer";

let state: InitialStateType

//переопределение стейта для каждого теста
beforeEach(() =>{
    state = {
        users: [
            {
                id: 0, name: 'Dimych 1', followed: false,
                photos: {
                    small: null,
                    large: null,
                },
                status: 'status 1'
            },
            {
                id: 1, name: 'Dimych 2', followed: false,
                photos: {
                    small: null,
                    large: null,
                },
                status: 'status 2'
            },
            {
                id: 2, name: 'Dimych 3', followed: true,
                photos: {
                    small: null,
                    large: null,
                },
                status: 'status 3'
            },
            {
                id: 3, name: 'Dimych 4', followed: true,
                photos: {
                    small: null,
                    large: null,
                },
                status: 'status 4'
            },
        ],
            pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [], //Array of users id
    }
})


test("follow success", () => {
    const newState = usersReducer(state, actions.followSuccess(2))
    expect(newState.users[1].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy()
})
test("unfollow success", () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))
    expect(newState.users[1].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})
