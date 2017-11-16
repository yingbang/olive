//计算时间差
export function getDateTimeDiff(startTime, endTime, isArray) {
    //默认现在时间
    if(endTime === null || endTime === undefined){
        endTime = new Date().getTime();
    }
    //返回时间格式
    if(isArray === null || isArray === undefined){
        isArray = false;
    }

    let retValue = {};

    let date3 = endTime - startTime;  //时间差的毫秒数

    //计算出相差天数
    let days = Math.floor(date3 / (24 * 3600 * 1000));
    retValue['Days'] = days;

    let years = Math.floor(days / 365);
    retValue['Years'] = years;

    let months = Math.floor(days / 30);
    retValue['Months'] = months;

    //计算出小时数
    let leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000));
    retValue['Hours'] = hours;

    //计算相差分钟数
    let leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000));
    retValue['Minutes'] = minutes;

    //计算相差秒数
    let leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
    let seconds = Math.round(leave3 / 1000);
    retValue['Seconds'] = seconds;

    let strTime = "";
    if (years >= 1) {
        strTime = years + "年前";
    } else if (months >= 1) {
        strTime = months + "个月前";
    } else if (days >= 1) {
        strTime = days + "天前";
    } else if (hours >= 1) {
        strTime = hours + "小时前";
    } else if (minutes >= 1) {
        strTime = minutes + "分钟前";
    } else {
        strTime = seconds + "秒前";
    }
    retValue['PubTime'] = strTime;     //帖子,文章,博客发表时间的一种简短表示方法
    return isArray ? retValue : strTime;
}
//二维数组去重[{id:1},{id:2},{id:3}] key表示根据哪个字段去重，默认根据id
export function uniqueArray(arr,key) {
    let result = [], hash = {};
    if(!key){
        key = 'id';
    }
    for (let i = 0; i < arr.length; i++) {
        let elem = arr[i];
        let keyValue = arr[i][key];
        if (!hash[keyValue]) {
            result.push(elem);
            hash[keyValue] = true;
        }
    }
    return result;
}

//从一个给定的数组arr中,随机返回num个不重复项
export function getArrayItems(arr, num) {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    let temp_array = [];
    for (let index in arr) {
        temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    let return_array = [];
    for (let i = 0; i<num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (temp_array.length>0) {
            //在数组中产生一个随机索引
            let arrIndex = Math.floor(Math.random()*temp_array.length);
            //将此随机索引的对应的数组元素值复制出来
            return_array[i] = temp_array[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
            temp_array.splice(arrIndex, 1);
        } else {
            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
            break;
        }
    }
    return return_array;
}

//判断数组中是否包含某个元素
export function inArray(arr, obj, key) {
    let i = arr.length;
    while (i--) {
        //如果有key表示数组中元素是一个集合[{},{}...]
        if (key && arr[i][key] === obj) {
            return true;
        }else if(arr[i] === obj){
            return true;
        }
    }
    return false;
}