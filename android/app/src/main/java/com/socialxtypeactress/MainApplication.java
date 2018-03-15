package com.socialxtypeactress;

import android.app.Application;

import com.facebook.react.ReactApplication;
<<<<<<< HEAD
import com.github.yamill.orientation.OrientationPackage;
=======
import com.cmcewen.blurview.BlurViewPackage;
>>>>>>> 45a4ba553dd4f0d23d371043074c5f60c5207911
import com.brentvatne.react.ReactVideoPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

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
<<<<<<< HEAD
                    new OrientationPackage(),
=======
                    new BlurViewPackage(),
>>>>>>> 45a4ba553dd4f0d23d371043074c5f60c5207911
                    new ReactVideoPackage(),
                    new PickerPackage(),
                    new VectorIconsPackage(),
                    new LinearGradientPackage(),
                    new ReactNativeConfigPackage()
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
