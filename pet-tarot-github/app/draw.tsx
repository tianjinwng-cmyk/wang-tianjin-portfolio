import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  tarotCardBack,
  tarotCardKeys,
  tarotCards as tarotData,
  type TarotCardKey,
} from '../constants/tarot-data';

import {
  Alert,
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const tarotCards = tarotCardKeys;

type TarotCard = TarotCardKey;

const cardPreview = tarotData;

const cardBackImage = tarotCardBack;

const tarotImages = tarotCardKeys.map(
  (card) => tarotData[card].image
);

function getTodayKey() {
  const now = new Date();

  return (
    now.getFullYear() +
    '-' +
    String(now.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(now.getDate()).padStart(2, '0')
  );
}

export default function DrawScreen() {
  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const [selectedCard, setSelectedCard] =
    useState<TarotCard | null>(null);

  // 1 = 正常宽度
  // 0 = 缩成一条线
  const flipAnimation =
    useRef(new Animated.Value(1)).current;

    const scaleAnimation =
  useRef(new Animated.Value(1)).current;

  // 提前加载六张塔罗牌
  useEffect(() => {
    async function preloadTarotImages() {
      try {
        await Promise.all(
          tarotImages.map((image) =>
            Image.loadAsync(image, {
              maxWidth: 800,
            })
          )
        );

        console.log('塔罗牌图片预加载完成');
      } catch (error) {
        console.log('塔罗牌图片预加载失败', error);
      }
    }

    preloadTarotImages();
  }, []);

  async function chooseCard(index: number) {
    // 已经选择以后，不能再选第二张
    if (selectedIndex !== null) {
      return;
    }

    setSelectedIndex(index);

    const today = getTodayKey();

    const savedDate =
      await AsyncStorage.getItem('dailyTarotDate');

    const savedCard =
      await AsyncStorage.getItem('dailyTarotCard');

    let card: TarotCard;

    // 今天已经抽过
    if (
      savedDate === today &&
      savedCard &&
      tarotCards.includes(savedCard as TarotCard)
    ) {
      card = savedCard as TarotCard;
    } else {
      // 今天第一次抽
      const randomIndex =
        Math.floor(Math.random() * tarotCards.length);

      card = tarotCards[randomIndex];

      await AsyncStorage.setItem(
        'dailyTarotDate',
        today
      );

      await AsyncStorage.setItem(
        'dailyTarotCard',
        card
      );
    }

    // 先把卡背缩窄
   Animated.timing(flipAnimation, {
  toValue: 0,
  duration: 250,
  easing: Easing.inOut(Easing.ease),
  useNativeDriver: true,
}).start(() => {
  // 卡牌最窄的时候换成正面
  setSelectedCard(card);

  // 展开正面
  Animated.timing(flipAnimation, {
    toValue: 1,
    duration: 300,
    easing: Easing.out(Easing.ease),
    useNativeDriver: true,
  }).start(() => {
    // 翻开以后稍微放大
    Animated.timing(scaleAnimation, {
      toValue: 1.28,
      duration: 350,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      // 给用户一点时间看清抽到的牌
      setTimeout(() => {
        router.push({
          pathname: '/result',
          params: {
            card: card,
          },
        });
      }, 650);
    });
  });
});
  }

  function viewResult() {
    if (!selectedCard) {
      return;
    }

    router.push({
      pathname: '/result',
      params: {
        card: selectedCard,
      },
    });
  }

  async function resetDailyCard() {
    await AsyncStorage.removeItem(
      'dailyTarotDate'
    );

    await AsyncStorage.removeItem(
      'dailyTarotCard'
    );

    flipAnimation.setValue(1);
    scaleAnimation.setValue(1);

    setSelectedIndex(null);
    setSelectedCard(null);

    Alert.alert(
      '今日牌已重置',
      '现在可以重新抽取今天的塔罗牌了。'
    );
  }

  function renderCard(index: number) {
    const isSelected =
      selectedIndex === index;

    const anotherCardSelected =
      selectedIndex !== null &&
      selectedIndex !== index;

    // 被选中的牌
    if (isSelected) {
      return (
        <Animated.View
          style={[
            styles.card,
            selectedCard && styles.cardFront,
            {
              transform: [
  { scaleX: flipAnimation },
  { scale: scaleAnimation },
],
            },
          ]}
        >
          {selectedCard ? (
            <Image
              source={
                cardPreview[selectedCard].image
              }
              style={styles.tarotImage}
              contentFit="contain"
              cachePolicy="memory-disk"
              enforceEarlyResizing
            />
          ) : (
            <Image
              source={cardBackImage}
              style={styles.tarotImage}
              contentFit="cover"
              cachePolicy="memory-disk"
              enforceEarlyResizing
            />
          )}
        </Animated.View>
      );
    }

    // 没有被选中的牌
    return (
      <Pressable
        disabled={selectedIndex !== null}
        onPress={() => chooseCard(index)}
        style={({ pressed }) => [
          styles.card,
          anotherCardSelected &&
            styles.disabledCard,
          pressed &&
            selectedIndex === null &&
            styles.cardPressed,
        ]}
      >
        <Image
          source={cardBackImage}
          style={styles.tarotImage}
          contentFit="cover"
          cachePolicy="memory-disk"
          enforceEarlyResizing
        />
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.symbol}>
        ✦ ☾ ✦
      </Text>

      <Text style={styles.title}>
        抽取今日塔罗
      </Text>

      <Text style={styles.subtitle}>
        闭上眼睛想一想今天的自己
      </Text>

      <View style={styles.cards}>
        {renderCard(0)}
        {renderCard(1)}
        {renderCard(2)}
      </View>

      {selectedCard ? (
        <>
          <Text style={styles.selectedTip}>
            你的今日牌已经出现
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.resultButton,
              pressed &&
                styles.resultButtonPressed,
            ]}
            onPress={viewResult}
          >
            <Text
              style={styles.resultButtonText}
            >
              查看今日运势
            </Text>
          </Pressable>
        </>
      ) : (
        <Text style={styles.tip}>
          请选择一张牌
        </Text>
      )}

      {__DEV__ && (
        <Pressable
          style={styles.resetButton}
          onPress={resetDailyCard}
        >
          <Text style={styles.resetText}>
            重置今日牌（开发测试）
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#F8F6F2',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 24,
},

  symbol: {
  fontSize: 19,
  color: '#C2A56A',
  marginBottom: 22,
  opacity: 0.85,
},

  title: {
  fontSize: 30,
  fontWeight: '600',
  color: '#493A39',
  letterSpacing: 3,
},

  subtitle: {
  marginTop: 14,
  fontSize: 15,
  color: '#A29590',
  letterSpacing: 0.5,
},
  cards: {
  flexDirection: 'row',
  gap: 16,
  marginTop: 64,
  alignItems: 'center',
},

  card: {
  width: 95,
  height: 169,

  backgroundColor: '#FCFAF7',

  borderRadius: 18,

  // 边框弱化，不再有很硬的金色框
  borderWidth: 1,
  borderColor: 'rgba(197, 163, 98, 0.30)',

  alignItems: 'center',
  justifyContent: 'center',

  // iPhone 上的柔和悬浮阴影
  shadowColor: '#6A554D',
  shadowOffset: {
    width: 0,
    height: 9,
  },
  shadowOpacity: 0.12,
  shadowRadius: 18,

  // Android
  elevation: 5,

  overflow: 'hidden',
},

  cardFront: {
    backgroundColor: '#EFE2D2',
  },

  tarotImage: {
  width: '100%',
  height: '100%',
  borderRadius: 16,
},

  cardPressed: {
    opacity: 0.75,
    transform: [
      {
        scale: 0.96,
      },
    ],
  },

  disabledCard: {
    opacity: 0.25,
  },

  tip: {
  marginTop: 48,
  fontSize: 15,
  color: '#9A8B86',
  letterSpacing: 1,
},

  selectedTip: {
    marginTop: 40,
    fontSize: 15,
    color: '#786260',
  },

  resultButton: {
    marginTop: 20,
    backgroundColor: '#7D3037',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#C8A96B',
  },

  resultButtonPressed: {
    opacity: 0.8,
  },

  resultButtonText: {
    color: '#FFF8EC',
    fontSize: 16,
    fontWeight: '600',
  },

  resetButton: {
    marginTop: 28,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C8A96B',
  },

  resetText: {
    fontSize: 13,
    color: '#A58768',
  },
});