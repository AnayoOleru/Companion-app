import companionAppLogo from '../../assets/icons/companion-logo.png';

export default {
  isBotProcessing: false,
  messages: [
    {
      _id: 1,
      text: 'hello',
      type: 'greetings',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Companion App',
        avatar: companionAppLogo
      }
    }
  ]
};
