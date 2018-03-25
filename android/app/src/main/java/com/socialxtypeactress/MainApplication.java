package com.socialxtypeactress;

import android.app.Application;
import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import com.horcrux.svg.SvgPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import iyegoroff.RNTextGradient.RNTextGradientPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.amazonaws.RNAWSCognitoPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new RNFSPackage(),
                    new SvgPackage(),
                    new ReactVideoPackage(),
                    new VectorIconsPackage(),
                    new RNTextGradientPackage(),
                    new OrientationPackage(),
                    new LinearGradientPackage(),
                    new PickerPackage(),
                    new ReactNativeConfigPackage(),
                    new BlurViewPackage(),
                    new RNAWSCognitoPackage()
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
    }
}
