import request from 'superagent';
//先把图片转成base64编码，然后上传，参数：上传地址，字段名称，图片数据{name:'',data:''}
export function imageUploadBase64(url,fieldName,fileData) {
    return new Promise(function (resolve,reject) {
        request.post(url)
            .attach(fieldName, fileData.data)
            .field('filename', fileData.name)
            .end((err, response) => {
                if (err) {
                    reject(err);
                }else{
                    resolve(response.body);
                }
            });
    });
}
//通过fetch的post方法进行上传，url中可以带userid=...
export function imageUploadFetch(url,fieldName,params){
    return new Promise(function (resolve, reject) {
        let formData = new FormData();
        for (let key in params){
            formData.append(key, params[key]);
        }
        let file = {uri: params.path, type: 'application/octet-stream', name: Math.random()+'image.jpg'};
        formData.append(fieldName, file);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8',
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseData)=> {
                resolve(responseData);
            })
            .catch((err)=> {
                reject(err);
            });
    });
}
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
        if(seconds <=0 ) seconds = 1;//防止出现负数
        strTime = seconds + "秒前";
    }
    retValue['PubTime'] = strTime;     //帖子,文章,博客发表时间的一种简短表示方法
    return isArray ? retValue : strTime;
}
//计算是否过期
export function isExpired(startTime,endTime) {
    //默认现在时间
    if(endTime === null || endTime === undefined){
        endTime = new Date().getTime();
    }
    return endTime - startTime >= 0;
}
//返回给定格式的时间：{formatTime(item['starttime'],"yyyy年MM月dd日 周w hh:mm:ss")}
export function formatTime(timestamp,format) {
    if(!format){
        format = "yyyy-MM-dd hh:mm:ss";
    }
    let weekday=new Array(7);
    weekday[0]="日";
    weekday[1]="一";
    weekday[2]="二";
    weekday[3]="三";
    weekday[4]="四";
    weekday[5]="五";
    weekday[6]="六";
    let newDate = new Date();
    newDate.setTime(timestamp);
    let date = {
        "M+": newDate.getMonth() + 1,
        "d+": newDate.getDate(),
        "h+": newDate.getHours(),
        "m+": newDate.getMinutes(),
        "s+": newDate.getSeconds(),
        "q+": Math.floor((newDate.getMonth() + 3) / 3),
        "S+": newDate.getMilliseconds(),
        "w+":weekday[newDate.getDay()],//这个是获取星期
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
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

//判断图片是否有前缀，没有的话加上域名
export function getFullPath(path,host) {
    if(path === "" || path === undefined || path === null) return;
    if (path.match(/^(http|https):\/\//)) {
        return path;
    } else {
        host = host || realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value || "";
        return host + path;
    }
}

//去除所有html标签
export function removeHTMLTag(str) {
    if(str === "" || str === null || str === undefined){
        return "";
    }
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/ /ig,'');//去掉
    return str;
}
