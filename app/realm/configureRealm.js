/**
 * Realm数据库
 *
 */
'use strict';
import Realm from 'realm';
import Schema from './schema';

function configureRealm() {
    let schema = new Schema();
    //关闭所有旧版本
    let next = Realm.schemaVersion(Realm.defaultPath);
    if (next > 0) {
      while (next < schema.schemas.length) {
          let migratedSchema = schema.schemas[next++];
          let migratedRealm = new Realm(migratedSchema);
          migratedRealm.close();
      }
    }
    //使用最新的一个版本
    let current = schema.current();
    //创建一个全局变量realmObj
    global.realmObj = new Realm(current);
}
export default configureRealm;