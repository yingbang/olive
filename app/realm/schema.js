/**
 * @flow
 */

'use strict';
//引入多个版本的数据库
import schema_v1 from './schema-v1';

class Schema {
  constructor() {
    //把所有版本的都引入
    this.schemas = [
      schema_v1,
    ];
  }
  //使用最新的一个
  current() {
    return this.schemas[this.schemas.length - 1];
  }
}
export default Schema;