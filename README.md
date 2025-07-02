# EcoHunt 🌱♻️

A gamified recycling and item trading React Native application developed during the Tartan Hack hackathon as a solo project.

## 🎯 Project Overview

EcoHunt transforms recycling and item trading into an engaging, scavenger hunt experience. The app encourages environmental consciousness by rewarding users with tokens for recycling activities and item exchanges, which can be used to grow a virtual garden.

## ✨ Features

### Current Features
- **Interactive Map Integration**: Google Maps API integration for displaying scavenger hunt item locations
- **Item Trading System**: Platform for users to trade unused items with others
- **Gamified Recycling**: 
  - Image detection for bottles, plastic, organic waste recycling
  - Token rewards for recycling activities
  - Token rewards for item exchanges
- **Virtual Garden**: Spend earned tokens to buy flowers and trees for your virtual garden
- **User Profiles**: Track personal recycling streaks and environmental impact
- **Environmental Impact Tracking**: Monitor trees saved, energy conserved, and plastic recycled

### Profile Features
- Personal streak tracking
- Environmental impact metrics (trees saved, energy saved, plastic recycled)
- Weekly and monthly contribution tracking
- Badge system for achievements
- Firebase authentication integration

## 🚀 Upcoming Features (WIP)

- **Community Page**: Connect with other eco-conscious users
- **Enhanced User Profiles**: Extended streak tracking and social features
- **Expanded Gamification**: More interactive elements and rewards
- **Advanced Trading System**: Improved item discovery and exchange mechanics

## 🛠️ Technology Stack

- **Frontend**: React Native with Expo
- **Maps**: Google Maps API
- **Authentication**: Firebase Auth
- **Database**: Firebase (with Data Connect)
- **Image Processing**: Finetunned multiclass image detection model



## 🎮 How It Works

1. **Sign Up/Login**: Create an account or sign in with Firebase authentication
2. **Explore the Map**: Use the interactive map to find nearby items available for trade
3. **Trade Items**: Exchange unused items with other users in your area
4. **Recycle & Earn**: Take photos of bottles for recycling to earn tokens
5. **Grow Your Garden**: Use earned tokens to purchase virtual plants and trees
6. **Track Progress**: Monitor your environmental impact and maintain recycling streaks

## Tartan Hack

This project was developed during **Tartan Hack** as a solo endeavor

## 🌍 Environmental Impact

EcoHunt aims to make a real difference by:
- Encouraging proper recycling habits
- Reducing waste through item reuse and trading
- Building community awareness around environmental issues
- Providing tangible rewards for eco-friendly actions

## 🚧 Development Status

**Current Status**: Work in Progress (WIP)

The app is in active development with core features implemented and additional features planned for future releases.

## 🔧 Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ecohunt.git
cd ecohunt
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase configuration:
   - Create a Firebase project
   - Add your Firebase config to `config/firebaseConfig.js`

4. Add Google Maps API key:
   - Obtain a Google Maps API key
   - Configure it in your app settings

5. Start the development server:
```bash
npx expo start
```

In the output, you'll find options to open the app in a:
- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## 🤝 Contributing

As this is a hackathon project developed solo, contributions and suggestions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Share ideas for improving the gamification system

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- **Tartan Hack** organizers for hosting an inspiring hackathon
- Firebase for authentication and database services
- Google Maps API for location services
- The React Native community for excellent documentation and support

---

**Made with 💚 for a greener tomorrow during Tartan Hack**
