const Token_key = 'token'
const UserInfo_key = 'userInfo'
export const setToken = (token) => {
    localStorage.setItem(Token_key,token)
}

export const getToken = () => {
    return localStorage.getItem(Token_key)
}

export const setUserInfo = (userInfo) => {
    localStorage.setItem(UserInfo_key, JSON.stringify(userInfo) )
}

export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem(UserInfo_key) || '{}')
}

export const removeTAndU = () => {
    localStorage.removeItem(UserInfo_key)
    localStorage.removeItem(Token_key)
}