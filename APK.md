### How to Generate a Signed APK

1. Make sure your Java binaries in PATH, then execute the command `keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`.
2. This command will ask you password. Type anything for example **storeapp** and remember it well along with some personal information. It will then generate a file called **my-release-key.keystore**.
3. Move the file **my-release-key.keystore** to `android\app\` folder.
4. Open your `~/.gradle/gradle.properties` and add following lines:
   ```
      MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
      MYAPP_RELEASE_KEY_ALIAS=my-key-alias
      MYAPP_RELEASE_STORE_PASSWORD=storeapp
      MYAPP_RELEASE_KEY_PASSWORD=storeapp
    ```
5. Edit `android\app\build.gradle` and add following info:
    ```
      android {
          ...
          defaultConfig { ... }
          signingConfigs {
              release {
                  if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                      storeFile file(MYAPP_RELEASE_STORE_FILE)
                      storePassword MYAPP_RELEASE_STORE_PASSWORD
                      keyAlias MYAPP_RELEASE_KEY_ALIAS
                      keyPassword MYAPP_RELEASE_KEY_PASSWORD
                  }
              }
          }
          buildTypes {
              release {
                  ...
                  signingConfig signingConfigs.release
              }
          }
      }
    ```
6. Generate the APK using the command `cd android && ./gradlew assembleRelease`, which you can find at `android/app/build/outputs/apk/app-release.apk`.
7. Test the release build using `react-native run-android --variant=release`.
