Banco de Inversores Cryptocurrency App

This project is a cryptocurrency app where you can create your user, check crypto prices and save them on your portfolio. The app was created aiming to be the first prototype of the final app to be presented to the Bank as a starting point.

What you will need to install this project on yout computer:

    Node
    Android Studio and Android SDK

Base dependencies

    axios for networking.
    expo for accessing the expo app and emulators
    numbro to format currencies
    prop-types to type-check our components exposed properties.
    react-native-async-storage for saving the user data
    react-native-chart-kit to render line charts
    react-native-config to manage envionments.
    react-native-keyboard-aware-scroll-view for inputs not being cut by the keyboard
    react-native-picker to use dropdownsnavigator
    react-navigation navigation library.
    react-native-localization for string localization.
    react-native-mmkv-storage as storage solution.
    redux for state management.
    redux-thunk to dispatch asynchronous actions.
    jest and react-native-testing-library for testing.

Usage

Run npm install once you have forked/cloned the repo

Folder structure

This template follows a very simple project structure:

    assets: Asset folder to store all images, vectors, etc.
    constants: General styles folder where you can find the app theme.
    src: This folder is the main container of all the code inside the application.
        components: Folder to store any common component. that you use through the app (such as a generic button or header).
        redux: This folder contains actions, reducers and the store.
        screens: Folder that contains all the application screens/features.
            Screen: Each screen has the logic and styles in a single file.
        App.js: Main component that starts the whole app.

Splash screen customization

To customize the splash screen (logo and background color) use the CLI provided in the official docs.

Generate production version

These are the steps to generate .apk, .aab and .ipa files
Android

    Generate an upload key
    Setting up gradle variables
    Go to the android folder
    Execute ./gradlew assemble[Env][BuildType]

Note: You have three options to execute the project assemble: Generates an apk that you can share with others. install: When you want to test a release build on a connected device. bundle: When you are uploading the app to the Play Store.

For more info please go to https://reactnative.dev/docs/signed-apk-android
iOS

    Go to the Xcode
    Select the schema
    Select 'Any iOS device' as target
    Product -> Archive

For more info please go to https://reactnative.dev/docs/publishing-to-app-store