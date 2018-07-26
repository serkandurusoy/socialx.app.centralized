fastlane_version '2.99.1'

APPLE_USER = 'christian@socialx.network'
# ENV['FASTLANE_PASSWORD'] # TODO: decide if we want to have password hardcoded here or not?

ENV['LC_ALL']='en_US.UTF-8'
ENV['LANG']='en_US.UTF-8'

Dir.chdir("..") do
  ENV['BUNDLE_COPY_PATH'] = "#{Dir.pwd}"
  ENV['EXTRA_PACKAGER_ARGS'] = "--sourcemap-output #{Dir.pwd}/index.ios.map"
end

before_all do
  ensure_git_branch(branch: 'beta/*') # here can have a regex
  ensure_git_status_clean
  git_pull
end

platform :ios do

  desc 'Create new version'
  lane :version do |options|
    if options[:version]
      sh("yarn version --no-git-tag-version --new-version #{options[:version]}")
      sh('yarn run postversion')
    else
      UI.abort_with_message! 'Version parameter is missing'
    end
  end

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
      sh('./ios-bugsnag.sh')
    end
  end

  desc 'Entire build and upload flow'
  lane :release do |options|
    version options
    build
    send_testflight
    bugsnag
  end

end

platform :android do
  # TODO: Android Lanes
end