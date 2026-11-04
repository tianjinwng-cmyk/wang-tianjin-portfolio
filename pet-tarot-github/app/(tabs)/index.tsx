import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.topSparkle}>✦  ☾  ✦</Text>

      <Text style={styles.title}>今日宠物塔罗</Text>
      <Text style={styles.subtitle}>PET TAROT</Text>

      <View style={styles.heroWrap}>
        <View style={styles.heroCircle}>
          <View style={styles.innerGlow} />
          <Text style={styles.heroMini}>HANA · SAIKI</Text>
          <Text style={styles.heroText}>毛孩子陪你看看</Text>
          <Text style={styles.heroText}>今天的心情与运势</Text>
        </View>
      </View>

      <Text style={styles.greeting}>晚上好 ✨</Text>

      <Text style={styles.description}>
        今天想看看{'\n'}毛孩子为你准备的运势吗？
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => router.push('/draw')}
      >
        <Text style={styles.buttonText}>抽取今日塔罗</Text>
      </Pressable>

      <Text style={styles.tip}>静下心来，想一想今天的自己</Text>

      <Text style={styles.bottomSparkle}>·  ✦  ·  ☾  ·  ✦  ·</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F1EA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  topSparkle: {
    fontSize: 24,
    color: '#C9A96B',
    marginBottom: 18,
    letterSpacing: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4B3535',
    letterSpacing: 2,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#B39B84',
    letterSpacing: 6,
    marginBottom: 28,
  },
  heroWrap: {
    marginBottom: 34,
  },
  heroCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#EFE3D4',
    borderWidth: 1.5,
    borderColor: '#D8BE8A',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  innerGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#F8F1E8',
  },
  heroMini: {
    fontSize: 12,
    color: '#B49C7E',
    letterSpacing: 3,
    marginBottom: 14,
  },
  heroText: {
    fontSize: 19,
    color: '#5C4643',
    lineHeight: 30,
    fontWeight: '500',
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4B3535',
    marginBottom: 18,
  },
  description: {
    fontSize: 17,
    lineHeight: 30,
    color: '#7E6B67',
    textAlign: 'center',
    marginBottom: 34,
  },
  button: {
    backgroundColor: '#8E3443',
    minWidth: 280,
    paddingVertical: 18,
    paddingHorizontal: 34,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: '#C9A96B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8E3443',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 3,
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF8F2',
    letterSpacing: 2,
  },
  tip: {
    marginTop: 26,
    fontSize: 15,
    color: '#B1A19A',
  },
  bottomSparkle: {
    marginTop: 42,
    fontSize: 20,
    color: '#C9A96B',
    letterSpacing: 5,
  },
});