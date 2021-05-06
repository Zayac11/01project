import {instance, APIResponseType, ResultCodesEnum} from "./api";
import {UserType} from "../types/types";

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data) //в контейнерной компоненте response станет data (датой)
    },

    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },

    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
}
