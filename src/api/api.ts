import axios from "axios";
import {ContactsType, PhotosType, ProfileType, UserType} from "../types/types";

    let instance = axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            "API-KEY": '3c506123-7591-4f5d-a26a-91140af2545as'
        }
    })

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}
type FollowResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type UnfollowResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data) //в контейнерной компоненте response станет data (датой)
    },

    getProfile(userId: number | null) {
        console.warn('Use profileAPI, dude')
        return profileAPI.getProfile(userId)
    },

    follow(userId: number) {
        return instance.post<FollowResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },

    unfollow(userId: number) {
        return instance.delete<UnfollowResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10,
}

type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: { id: number }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
}
type LogoutResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    me() { //is current user authorized
        return instance.get<MeResponseType>(`auth/me`)
            .then(response => response.data)
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
    },

    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`)
    },

}

type GetProfileResponseType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

type UpdateStatusResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type SavePhotoResponseType = {
    data: PhotosType
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type SaveProfileResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<GetProfileResponseType>(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusResponseType>(`profile/status`, {status: status})
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put<SavePhotoResponseType>(`profile/photo`, formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<SaveProfileResponseType>(`profile`, profile)
            .then(response => response.data)
    },
}

type GetCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`)
            .then(response => response.data)
    },
}
