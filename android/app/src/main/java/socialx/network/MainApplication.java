package socialx.network;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.vydia.RNUploader.UploaderReactPackage;
import com.peel.react.TcpSocketsModule;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.react.rnspinkit.RNSpinkitPackage;
import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.horcrux.svg.SvgPackage;
import net.zubricky.AndroidKeyboardAdjust.AndroidKeyboardAdjustPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;

import iyegoroff.RNTextGradient.RNTextGradientPackage;

import com.horcrux.svg.SvgPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.rnfs.RNFSPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;

import com.amazonaws.RNAWSCognitoPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;

import com.oney.WebRTCModule.WebRTCModulePackage;

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
                new ReactNativeRestartPackage(),
                new LottiePackage(),
                new WebRTCModulePackage(),
                new UploaderReactPackage(),
                new TcpSocketsModule(),
                new ImageResizerPackage(),
                new RNDeviceInfo(),
                new RNSpinkitPackage(),
                new RCTSplashScreenPackage(),
                new FastImageViewPackage(),
                // new RNPushNotificationPackage(),
                new AndroidKeyboardAdjustPackage(),
                new SvgPackage(),
                new ReactVideoPackage(),
                new VectorIconsPackage(),
                new RNTextGradientPackage(),
                new OrientationPackage(),
                new LinearGradientPackage(),
                new PickerPackage(),
                new RNFSPackage(),
                new RNFetchBlobPackage(),
                new ReactNativeConfigPackage(),
                new BlurViewPackage(),
                new RNAWSCognitoPackage(),
                new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
                new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
                new AppCenterReactNativePackage(MainApplication.this)
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
