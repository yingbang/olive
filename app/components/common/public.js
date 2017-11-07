//二维数组去重[{id:1},{id:2},{id:3}]
//key表示根据哪个字段去重，默认根据id
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