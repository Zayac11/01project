import * as axios from "axios";

let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": '3c506123-7591-4f5d-a26a-91140af2545a'
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data) //в контейнерной компоненте response станет data (датой)
    },

    getUserProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },

    onUserAuth() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },
}

// export const getUsers = (currentPage = 1, pageSize = 10) => {
//     return instance.get(`users?page=${currentPage}&count=${pageSize}`
//         .then(response => response.data) //в контейнерной компоненте response станет data (датой)
//     );
// }

