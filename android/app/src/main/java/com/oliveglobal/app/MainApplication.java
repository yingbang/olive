package com.oliveglobal.app;

import android.app.Application;

import com.facebook.react.BuildConfig;
import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.olive.u_share.UShareReactPackage;
import com.olive.u_share.util.Constants;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import io.realm.react.RealmReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.umeng.socialize.PlatformConfig;
import com.umeng.socialize.UMShareAPI;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  {
    PlatformConfig.setWeixin(Constants.KEY_WEIXIN,Constants.SECRET_WEIXIN);
    PlatformConfig.setSinaWeibo(Constants.KEY_WEIBO, Constants.SECRET_WEIBO,Constants.URL_WEIBO);
    PlatformConfig.setQQZone(Constants.KEY_QQ, Constants.SECRET_QQ);
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new ReactNativeContacts(),
            new RCTCameraPackage(),
            new PickerPackage(),
            new RealmReactPackage(),
            new VectorIconsPackage(),
            new SplashScreenReactPackage(),
              new UShareReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    UMShareAPI.get(this);
  }
}
