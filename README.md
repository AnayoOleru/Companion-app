[![Maintainability](https://api.codeclimate.com/v1/badges/8723f2d38cf544250591/maintainability)](https://codeclimate.com/repos/5d01ee02bad51c0163009ce3/maintainability)

# Companion App

> This is a mobile application that acts as your virtual buddy that allows you to book meeting rooms directly from your phone in any organizations meeting rooms.

## Product Road Map

Check the [product scope](https://docs.google.com/presentation/d/1IjvC1Y6Futdxc7jR43agokuKoU38iCMTvTyJOCBBH2c/edit#slide=id.g57b83b523f_0_666) and [road map](https://docs.google.com/spreadsheets/d/1P87qFWOfEdm5WjNHZ8D45KVL_MEg93clb-N9RLV-CDY/edit#gid=1024734751)

### Requirements

Ensure you have NodeJS and Yarn installed before you start the installation process.
To download NodeJS and Npm [click here](https://nodejs.org/en/download/). OR To install Node.js and Npm via package manager [click here](https://nodejs.org/en/download/package-manager/)

### Set-up Process

```
- Clone the repository to your computer ensure to run the command below in the directory you want to store the project.
    # git clone https://github.com/AnayoOleru/Companion-app.git
```


#### Environment Variables

Creating a new file `.env` under root directory, and ensure you have all environment variables. The sample of `.env` can be found [here](.env.example).

The environmental variables can be found [here](https://andela.slack.com/archives/GJZ2Z97UM/p1561993380003500?thread_ts=1561980575.000900&cid=GJZ2Z97UM)


#### Flow

- Ensure you Install flow-bin globally - follow [instructions](https://flow.org/en/docs/install/)

For Visual Studio Code

- Ensure you install the Vs Code extension thats supports flow called Flow Language Support --> https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode.
- Then go to your editor user settings and add "javascript.validate.enable": false. On VScode, press CMD+SHIFT+P and then type in Preferences to open your settings in JSON. At this point you can add "javascript.validate.enable": false to your user settings

#### Set-up Expo
- Run `yarn global add expo-cli` in the terminal to install the expo-cli globally.
- Install the Expo app in your iOS/Android phone (*`skip this step if you intend on using an emulator/simulator`*)
   - For android - [link](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - For iPhone - [link](https://itunes.com/apps/exponent)

   

#### Emulator/Simulator

Ensure you have an emulator installed, the links below will help guide you through the set up.

- [Xcode](https://facebook.github.io/react-native/docs/getting-started#xcode)
- [Android](https://facebook.github.io/react-native/docs/getting-started#android-development-environment)

### Run in development

1. Run `yarn install` - To automatically install all dependencies.
2. Run `yarn start` - To run the project.
3. Scan the QR code the with the Expo app on your modile device or ensure that you're simulator/emulator is running, then press i or a to run the project on iOS or Android respectively.

   `Note:` For an iOS device open the phone camera app and scan the QR Code, you will then be prompted to open in expo, accept the prompt to start.


### Running tests

`yarn test`

### Updating failing tests due to failed snapshots

`yarn test:update`

### Wiki

Here's a link to the [wiki]() page.
