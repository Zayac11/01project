const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    postsData:[
        {id: 1, text: 'post 1', likeCount: '15'},
        {id: 2, text: 'post 2', likeCount: '20'},
        {id: 3, text: 'post 3', likeCount: '25'}
    ],
    newPostText: 'avatar'
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 4,
                text: state.newPostText,
                likeCount: '0'
            };
            //Делаем копию state
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            };
        }
        default:
            return state;
    }
    //observer connect'a смотрит на изменение объекта и перерисовывает, если он изменился
    //объект изменился, если поменялась ссылка на него(при копировании) или изменилась его внутренность
//Создаём новый объект и делаем туда копию state, и изменяем её, далее connect сравнивает внутренности объектов и перерисовывает, если есть различия
//Нам нельзя изменять пришедший к нам изначально state, если мы перепишем и изменим его, то connect будет сравнивать

    // if(action.type === ADD_POST) {
    //     let newPost = {
    //         id: '5',
    //         text: state.newPostText,
    //         likeCount: '0'
    //     };
    //     state.postsData.push(newPost);
    //     state.newPostText='';
    //     // this._callSubscriber(this._state);
    // } else if(action.type === UPDATE_NEW_POST_TEXT) {
    //     state.newPostText = action.newText;
    //     // this._callSubscriber(this._state);
    // }
    // return state;
}

export const addPostActionCreator = () => ({type: ADD_POST}) //return
export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text,
    }
}

export default profileReducer;