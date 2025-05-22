import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const slides = [
  {
    key: 'slide1',
    title: 'Access lecture notes & past questions',
    image: require('../assets/images/splash-icon.png'),
    description: 'All your academic resources in one place.'
  },
  {
    key: 'slide2',
    title: 'Register courses and check results',
    image: require('../assets/images/partial-react-logo.png'),
    description: 'Manage your courses and view results easily.'
  },
  {
    key: 'slide3',
    title: 'Study offline, stay updated',
    image: require('../assets/images/icon.png'),
    description: 'Download resources and get notifications.'
  }
];

export default function OnboardingScreen() {
  const [index, setIndex] = React.useState(0);
  const router = useRouter();

  const nextSlide = () => {
    if (index < slides.length - 1) setIndex(index + 1);
    else router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Image source={slides[index].image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{slides[index].title}</Text>
      <Text style={styles.desc}>{slides[index].description}</Text>
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.activeDot]} />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={nextSlide}>
        <Text style={styles.buttonText}>{index === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#006747',
    textAlign: 'center',
    marginBottom: 12,
  },
  desc: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 24,
  },
  dots: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d1d5db',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#006747',
  },
  button: {
    backgroundColor: '#006747',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
