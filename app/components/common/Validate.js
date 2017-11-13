//验证手机号
export const isMobile = (mobile) => {
    if(mobile.length === 0)
    {
        return {msg:'请输入手机号码！'};
    }
    if(mobile.length !== 11)
    {
        return {msg:'请输入有效的手机号码！'};
    }

    if(!(/^1(3|4|5|7|8)\d{9}$/.test(mobile)))
    {
        return {msg:'请输入有效的手机号码！'};
    }
    return true;
};
//验证是否为空
export const isBlank = (content) => {
    if(content === undefined || content === null || content.length === 0){
        return true;
    }
    return false;
};