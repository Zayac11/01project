import React from 'react';
import './index.css';
import store from './redux/redux-store';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";


//(state)
// let rerenderEntireTree = () => {
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App
                     // state={state}
                     // dispatch={store.dispatch.bind(store)}
                     // store={store}
                     // addPost={store.addPost.bind(store)}
                     // updateNewPostText={store.updateNewPostText.bind(store)}
                     // addMessage={store.addMessage.bind(store)}
                     // updateNewMessageText={store.updateNewMessageText.bind(store)}
                />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
// }

// rerenderEntireTree(); //Первичная отрисовка
// store.subscribe(rerenderEntireTree);

// store.subscribe(() => {
//     rerenderEntireTree();
// });

// Изначально запускается index.js, функция rerenderEntireTree вызывается здесь же и происходит первичная отрисовка
// Далее вызывается импортированная функция subscribe, которая передает функцию rerenderEntireTree в файл store.js
// В файле store.js созданная там функция rerenderEntireTree становится равна функции rerenderEntireTree из файла index.js
// И если какая-либо функция добавления поста или обновления textarea вызывает rerenderEntireTree, то происходит вызов функции rerenderEntireTree
// из файла index.js и, соответственно, перерисовка страницы

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
