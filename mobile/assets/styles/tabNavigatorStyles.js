import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const tabNavigatorStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    elevation: 8,
    // backgroundColor: '#ffcc80', // Modern turuncu/sarı renk
    backgroundColor: '#ffe5d9',
    borderRadius: 0,
    height: 60,
    paddingTop: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.20,
    shadowRadius: 6,
  },

  // Aktif tab için container
  activeTabContainer: {
    backgroundColor: "#FFF3E0",
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 1.1 }],
  },

  inactiveTabContainer: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 1 }],
  },
});

export const tabColors = {
  active: '#333',
  inactive: '#666',
  background: '#ffcc80',
  activeBackground: 'rgba(255, 255, 255, 0.3)',
};