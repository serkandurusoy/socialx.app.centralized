fastlane_version '2.99.1'

# $APPLE_USER = 'christian@socialx.network'
# $APPLE_PWD = 'HdricFe3mBWDx>vBCWMxwFzre+Ac'

ENV['BUNDLE_COPY_PATH'] = "#{ENV['PWD']}"
ENV['EXTRA_PACKAGER_ARGS'] = "--sourcemap-output #{ENV['PWD']}/index.ios.map"

before_all do
  # ensure_git_branch(
  #     branch: 'development'
  # )
  #ensure_git_status_clean
  #git_pull
end

platform :ios do

  desc 'Create new version'
  lane :version do |options|
    sh("yarn version --no-git-tag-version --new-version #{options[:version]}")
    sh('yarn run postversion')
  end

  desc 'Build the iOS application.'
  lane :build do
    # increment_build_number(xcodeproj: './ios/name.xcodeproj')
    gym(
        verbose: true,
        scheme: 'SocialxTypeActress',
        workspace: './ios/SocialxTypeActress.xcworkspace',
        clean: false,
        export_method: 'app-store',
    )
  end

  desc 'Upload to Testflight.'
  lane :send_testflight do
    puts "TODO TF"
  end

  desc 'Send sources to BugSnag'
  lane :bugsnag do
    puts "TODO BugSnag"
  end

end

platform :android do
  # Android Lanes
end