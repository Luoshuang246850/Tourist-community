import http from "./http";

// 解析token
export const checkToken = () => {
    return http.requestGet('/user/utils/check_token');
};
// 获取地址
export const listAddress = () => {
    return http.requestGet('/back/food/list/1/6')
}

//登录
export const doLogin = (verifyCode, sobUser) => {
    return http.requestPost('/user/login/' + verifyCode + '/?from=_p', sobUser);
};