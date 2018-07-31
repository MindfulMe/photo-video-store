import Colors from '../../../native-base-theme/variables/commonColor';

export default {
  navbarProps: {
    navigationBarStyle: { backgroundColor: 'pink' },
    titleStyle: {
      color: Colors.textColor,
      alignSelf: 'center',
      letterSpacing: 2,
      fontSize: Colors.fontSizeBase,
    },
    backButtonTintColor: Colors.textColor,
  },

  tabProps: {
    swipeEnabled: true,
    activeBackgroundColor: 'pink',
    inactiveBackgroundColor: 'rgba(100,102,225,0.7)',
    tabBarStyle: { backgroundColor: 'pink' },
  },

  icons: {
    style: { color: 'black' },
  },
};
