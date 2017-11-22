package com.olive.u_login;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.Callback;
import com.umeng.socialize.UMAuthListener;
import com.umeng.socialize.UMShareAPI;
import com.umeng.socialize.bean.SHARE_MEDIA;

import java.lang.ref.WeakReference;
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
            public void onStart(SHARE_MEDIA share_media) {}

            @Override
            public void onComplete(SHARE_MEDIA share_media, int i, Map<String, String> map) {
                if (successCallback != null) successCallback.invoke("登录成功啦");
            }

            @Override
            public void onError(SHARE_MEDIA share_media, int i, Throwable throwable) {
                if (errorCallback != null) errorCallback.invoke("登录失败：" + throwable.getMessage());
            }

            @Override
            public void onCancel(SHARE_MEDIA share_media, int i) {
                if (errorCallback != null) errorCallback.invoke("取消了");
            }
        });
    }

    public static void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (mActivity == null) return;
        UMShareAPI.get(mActivity.get()).onActivityResult(requestCode, resultCode, data);
    }
}
