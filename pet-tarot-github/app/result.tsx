import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  tarotCards as tarotData,
  type TarotCardKey,
} from '../constants/tarot-data';


export default function ResultScreen() {
  const { card } = useLocalSearchParams<{ card?: string }>();

  const cardKey: TarotCardKey =
    typeof card === 'string' && card in tarotData
      ? (card as TarotCardKey)
      : 'star';

  const result = tarotData[cardKey];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.topSymbol}>✦</Text>

      <Text style={styles.number}>{result.number}</Text>

     <Image
  source={result.image}
  style={styles.tarotImage}
  contentFit="contain"
  cachePolicy="memory-disk"
  enforceEarlyResizing
/>
      <Text style={styles.title}>{result.title}</Text>

      <Text style={styles.english}>
        {result.english}
      </Text>

      <Text style={styles.keywords}>
        {result.keywords}
      </Text>

      <View style={styles.messageBox}>
        <Text style={styles.messageTitle}>
          毛孩子想告诉你
        </Text>

        <Text style={styles.message}>
          {result.message}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5EEE4',
  },

  container: {
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 60,
    paddingHorizontal: 28,
  },

  topSymbol: {
    fontSize: 28,
    color: '#B79355',
    marginBottom: 14,
  },

  number: {
    fontSize: 15,
    color: '#A58768',
    letterSpacing: 6,
    marginBottom: 22,
  },

  tarotImage: {
    width: 270,
    height: 420,
    borderRadius: 14,
  },

  title: {
    fontSize: 34,
    fontWeight: '600',
    color: '#442B2D',
    marginTop: 28,
  },

  english: {
    marginTop: 7,
    fontSize: 13,
    color: '#A58768',
    letterSpacing: 5,
  },

  keywords: {
    marginTop: 24,
    fontSize: 16,
    color: '#786260',
  },

  messageBox: {
    marginTop: 32,
    width: '100%',
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderRadius: 22,
    backgroundColor: '#EFE2D2',
    borderWidth: 1,
    borderColor: '#D4BA85',
  },

  messageTitle: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    color: '#442B2D',
    marginBottom: 18,
  },

  message: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 28,
    color: '#786260',
  },
});