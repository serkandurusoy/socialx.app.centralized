fastlane_version '2.99.1'

APPLE_USER = 'christian@socialx.network'
# ENV['FASTLANE_PASSWORD'] # TODO: decide if we want to have password hardcoded here or not?

GOOGLE_JSON_KEY_PATH = "#{Dir.pwd}/android_google_play/gp-api-key.json"

ENV['LC_ALL'] = 'en_US.UTF-8'
ENV['LANG'] = 'en_US.UTF-8'

Dir.chdir("..") do
  ENV['BUNDLE_COPY_PATH'] = "#{Dir.pwd}"
  ENV['EXTRA_PACKAGER_ARGS'] = "--sourcemap-output #{Dir.pwd}/index.ios.map"
end

before_all do
  ensure_git_branch(branch: 'beta/*') # here can have a regex
  ensure_git_status_clean
  git_pull
end

desc 'Project install: yarn + pods'
lane :install_dev do
  Dir.chdir("..") do
    sh('./fastlane/scripts/project-install.sh')
  end
end

desc 'Create new version'
lane :version do |options|
  if options[:version]
    sh("yarn version --no-git-tag-version --new-version #{options[:version]}")
    sh('yarn run postversion')
  else
    UI.abort_with_message! 'Version parameter is missing'
  end
end

platform :ios do

  desc 'Build the iOS application'
  lane :build do
    gym(
        verbose: true,
        scheme: 'SocialxTypeActress',
        workspace: './ios/SocialxTypeActress.xcworkspace',
        clean: true,
        export_method: 'app-store',
    )
  end

  desc 'Upload to TestFlight'
  lane :send_testflight do
    upload_to_testflight(
        username: "#{APPLE_USER}",
        app_identifier: 'socialxnetwork',
        ipa: 'SocialxTypeActress.ipa',
        skip_submission: true,
        skip_waiting_for_build_processing: true,
    )
  end

  desc 'Send sources to BugSnag'
  lane :bugsnag do
    Dir.chdir("..") do
      sh('./fastlane/scripts/ios-bugsnag.sh')
    end
  end

  desc 'Entire build and upload flow'
  lane :release do |options|
    install_dev
    version options
    build
    send_testflight
    bugsnag
  end

end

platform :android do

  desc 'Ensure Android NDK r16b'
  lane :pre_build do
    sh('./scripts/install-android-ndk.sh')
  end

  desc 'Build the Android application'
  lane :build do
    gradle(
        task: 'clean',
        project_dir: 'android',
    )
    gradle(
        task: 'assemble',
        build_type: 'Release',
        project_dir: 'android',
    )
  end

  lane :send_play_store do
    upload_to_play_store(
        track: 'internal', # other options here: 'alpha', 'beta', 'production'
        json_key: "#{GOOGLE_JSON_KEY_PATH}",
        package_name: 'socialx.network',
        apk: './android/app/build/outputs/apk/app-release.apk',
    )
  end

  desc 'Send sources to BugSnag'
  #  TODO: this needs update!
  lane :bugsnag do
    Dir.chdir("..") do
      sh('./fastlane/scripts/android-bugsnag.sh')
    end
  end

  desc 'Entire build and upload flow'
  lane :release do |options|
    # install_dev
    version options
    # pre_build
    build
    send_play_store
    # bugsnag
  end

end