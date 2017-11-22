package com.oliveglobal.app;

import com.facebook.react.ReactActivity;
import com.olive.u_share.UShare;
import com.olive.u_login.ULogin;

import org.devio.rn.splashscreen.SplashScreen; // here

import android.content.Intent;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "olive";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this,true);
        super.onCreate(savedInstanceState);
        UShare.init(this);
        ULogin.init(this);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        UShare.onActivityResult(requestCode,resultCode,data);
        ULogin.onActivityResult(requestCode,resultCode,data);
    }
    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        UShare.onRequestPermissionsResult(requestCode,permissions,grantResults);
    }
}
