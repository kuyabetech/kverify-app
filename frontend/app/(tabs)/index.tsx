import React from 'react';
import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Button, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const user = useSelector((state: any) => state.user.user);
  const router = useRouter();

  // Only run navigation after component is mounted to avoid navigation before Root Layout
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    // Show onboarding only on first launch
    let hasSeenOnboarding = false;
    try {
      if (typeof window !== 'undefined') {
        hasSeenOnboarding = Boolean(window.localStorage.getItem('ksusta_onboarding'));
      }
    } catch {}
    if (!hasSeenOnboarding) {
      router.replace('/onboarding');
      try {
        if (typeof window !== 'undefined') window.localStorage.setItem('ksusta_onboarding', '1');
      } catch {}
    } else if (!user) {
      router.replace('/login');
    }
  }, [user, mounted]);

  if (!user || !mounted) return null;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Welcome, {user.name}!</Text>
        <Text>KSUSTADOCS Dashboard</Text>
        <Button
          title="View Resources"
          onPress={() => router.push('/(tabs)/resources')}
          color="#006747"
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
