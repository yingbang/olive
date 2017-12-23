package com.olive.u_login;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.umeng.socialize.UMAuthListener;
import com.umeng.socialize.UMShareAPI;
import com.umeng.socialize.bean.SHARE_MEDIA;

import org.json.JSONObject;
import org.json.JSONStringer;
import org.json.JSONTokener;

import java.lang.ref.WeakReference;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by tangyunfei on 2017/11/22.
 */

public class ULogin {
    private static WeakReference<Activity> mActivity;

    public static void init(Activity activity) {
        if (activity == null) return;
        mActivity = new WeakReference<>(activity);
    }
    public static void login(final Callback errorCallback, final Callback successCallback) {
        if (mActivity == null) return;
        mActivity.get().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                openLogin(errorCallback,successCallback);
            }
        });

    }
    private static void openLogin(final Callback errorCallback, final Callback successCallback) {
        UMShareAPI.get(mActivity.get()).getPlatformInfo(mActivity.get(), SHARE_MEDIA.WEIXIN, new UMAuthListener() {
            @Override
            public void onStart(SHARE_MEDIA share_media) {
                //Log.e("start","=============================start:zhixingle================");
            }

            @Override
            public void onComplete(SHARE_MEDIA share_media, int i, Map<String, String> data) {
                //Log.e("chenggong","=============================chenggong:zhixingle================"+data.toString());
                String jsonStr = "";
                if(data != null){
                    jsonStr = "{'name':'"+data.get("name")+"','gender':'"+data.get("gender")+"','iconurl':'"+data.get("iconurl")+
                            "','country':'"+data.get("country")+"','province':'"+data.get("province")+
                            "','city':'"+data.get("city")+"','openid':'"+data.get("openid")+"','unionid':'"+data.get("unionid")+"'}";
                    //Log.e("chenggong","=============================chenggong:zhixingle================"+jsonStr);
                }
                if (successCallback != null) successCallback.invoke(jsonStr);
            }

            @Override
            public void onError(SHARE_MEDIA share_media, int i, Throwable throwable) {
                //Log.e("shibai","=============================shibai:zhixingle================");
                if (errorCallback != null) errorCallback.invoke("登录失败：" + throwable.getMessage());
            }

            @Override
            public void onCancel(SHARE_MEDIA share_media, int i) {
                if (errorCallback != null) errorCallback.invoke("取消了");
            }
        });
    }

    public static void onActivityResult(int requestCode, int resultCode, Intent data) {
        //Log.e("onactivity","=============================activity:zhixingle================");
        if (mActivity == null) return;
        UMShareAPI.get(mActivity.get()).onActivityResult(requestCode, resultCode, data);
        //Log.e("onactivity2","=============================activity2:zhixingle================");
    }
}
