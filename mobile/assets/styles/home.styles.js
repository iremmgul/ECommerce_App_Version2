import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary || '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text || '#666',
    marginBottom: 32,
  },
  button: {
    backgroundColor: COLORS.primary || '#6A1B9A',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonOutline: {
    borderColor: COLORS.primary || '#6A1B9A',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonOutlineText: {
    color: COLORS.primary || '#6A1B9A',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
