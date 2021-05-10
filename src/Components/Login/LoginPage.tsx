import React, {FC} from 'react'
import s from '../Common/FormsControls/FormsControls.module.css'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, GetStringCase, Input} from '../Common/FormsControls/FormsControls'
import {required} from '../../utils/validators/validators'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../redux/auth-reducer'
import {Redirect} from 'react-router-dom'
import {AppStateType} from '../../redux/redux-store'

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {

    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", "email",[required], Input)}
            {createField<LoginFormValuesTypeKeys>("Password", "password",[required], Input, { type: 'password'})}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe",[], Input, { type: 'checkbox'}, "Remember me")}

            {
                captchaUrl && <img src={captchaUrl} alt="captcha"/>
            }
            {
                captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input, {})
            }

            {
                error &&
                <div className={s.formSummaryError}>
                    {error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypeKeys = GetStringCase<LoginFormValuesType>


export const LoginPage: FC = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if(isAuth) {
        return <Redirect to='/profile' />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm captchaUrl={captchaUrl} onSubmit = {onSubmit} />
        </div>
    );
}
