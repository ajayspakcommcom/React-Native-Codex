import React, {useEffect, useMemo, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  clamp,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type DeckLevel = 'collapsed' | 'peek' | 'expanded';
type WorkspaceMode = 'deployments' | 'incidents' | 'alerts';

type CommandCard = {
  id: string;
  label: string;
  owner: string;
  eta: string;
  severity: 'critical' | 'high' | 'medium';
};

const SPRING_CONFIG = {
  damping: 24,
  stiffness: 230,
  mass: 0.9,
};

const commandCards: ReadonlyArray<CommandCard> = [
  {
    id: 'deploy',
    label: 'Approval queue',
    owner: 'Release Council',
    eta: '12 min',
    severity: 'high',
  },
  {
    id: 'incident',
    label: 'Checkout saturation',
    owner: 'NOC Shift A',
    eta: '4 min',
    severity: 'critical',
  },
  {
    id: 'alerts',
    label: 'Edge latency surge',
    owner: 'Observability',
    eta: '18 min',
    severity: 'medium',
  },
];

const getSnapPositions = (screenHeight: number) => ({
  expanded: Math.max(118, screenHeight * 0.15),
  peek: Math.max(260, screenHeight * 0.42),
  collapsed: Math.max(430, screenHeight * 0.72),
});

const getNearestDeckLevel = (
  value: number,
  snapPositions: ReturnType<typeof getSnapPositions>,
): DeckLevel => {
  'worklet';

  const distances = [
    {
      level: 'expanded' as const,
      distance: Math.abs(value - snapPositions.expanded),
    },
    {
      level: 'peek' as const,
      distance: Math.abs(value - snapPositions.peek),
    },
    {
      level: 'collapsed' as const,
      distance: Math.abs(value - snapPositions.collapsed),
    },
  ];

  distances.sort((left, right) => left.distance - right.distance);
  return distances[0]?.level ?? 'peek';
};

const WorkspaceCommandDeck = () => {
  const {height} = useWindowDimensions();
  const snapPositions = useMemo(() => getSnapPositions(height), [height]);
  const [deckLevel, setDeckLevel] = useState<DeckLevel>('collapsed');
  const [activeMode, setActiveMode] = useState<WorkspaceMode>('deployments');

  const sheetTranslateY = useSharedValue(snapPositions.collapsed);
  const dragStartY = useSharedValue(snapPositions.collapsed);

  useEffect(() => {
    sheetTranslateY.value = snapPositions[deckLevel];
  }, [deckLevel, sheetTranslateY, snapPositions]);

  useAnimatedReaction(
    () => getNearestDeckLevel(sheetTranslateY.value, snapPositions),
    (next, previous) => {
      if (next !== previous) {
        runOnJS(setDeckLevel)(next);
      }
    },
    [snapPositions],
  );

  const panGesture = Gesture.Pan()
    .onStart(() => {
      dragStartY.value = sheetTranslateY.value;
    })
    .onUpdate(event => {
      const nextValue = dragStartY.value + event.translationY;
      sheetTranslateY.value = clamp(
        nextValue,
        snapPositions.expanded,
        snapPositions.collapsed,
      );
    })
    .onEnd(event => {
      const projectedY = sheetTranslateY.value + event.velocityY * 0.08;
      const nextLevel = getNearestDeckLevel(projectedY, snapPositions);
      sheetTranslateY.value = withSpring(snapPositions[nextLevel], SPRING_CONFIG);
    });

  const handleDeckLevelPress = (nextLevel: DeckLevel) => {
    setDeckLevel(nextLevel);
    sheetTranslateY.value = withSpring(snapPositions[nextLevel], SPRING_CONFIG);
  };

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      sheetTranslateY.value,
      [snapPositions.collapsed, snapPositions.expanded],
      [0.08, 0.3],
    ),
  }));

  const deckStyle = useAnimatedStyle(() => ({
    transform: [{translateY: sheetTranslateY.value}],
  }));

  const handleStyle = useAnimatedStyle(() => ({
    width: interpolate(
      sheetTranslateY.value,
      [snapPositions.collapsed, snapPositions.expanded],
      [72, 112],
    ),
  }));

  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      sheetTranslateY.value,
      [snapPositions.collapsed, snapPositions.expanded],
      [0.82, 1],
    ),
    transform: [
      {
        translateY: interpolate(
          sheetTranslateY.value,
          [snapPositions.collapsed, snapPositions.expanded],
          [14, 0],
        ),
      },
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screen}>
          <View style={styles.heroCard}>
            <Text style={styles.eyebrow}>Senior Performance</Text>
            <Text style={styles.heroTitle}>Workspace Command Deck</Text>
            <Text style={styles.heroDescription}>
              The command surface snaps on the UI thread. JS only receives the
              high-level deck state instead of every drag frame.
            </Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Deck Level</Text>
              <Text style={styles.statValue}>{deckLevel}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Active Mode</Text>
              <Text style={styles.statValue}>{activeMode}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Execution</Text>
              <Text style={styles.statValue}>UI thread</Text>
            </View>
          </View>

          <View style={styles.modeRail}>
            {(['deployments', 'incidents', 'alerts'] as const).map(mode => (
              <Pressable
                key={mode}
                accessibilityRole="button"
                onPress={() => {
                  setActiveMode(mode);
                }}
                style={[
                  styles.modeChip,
                  activeMode === mode && styles.activeModeChip,
                ]}>
                <Text
                  style={[
                    styles.modeChipText,
                    activeMode === mode && styles.activeModeChipText,
                  ]}>
                  {mode}
                </Text>
              </Pressable>
            ))}
          </View>

          <Animated.View pointerEvents="none" style={[styles.backdrop, backdropStyle]} />

          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.deckSurface, deckStyle]}>
              <Animated.View style={[styles.handle, handleStyle]} />

              <Animated.View style={headerStyle}>
                <Text style={styles.deckLabel}>Gesture-Orchestrated Surface</Text>
                <Text style={styles.deckTitle}>High-frequency command queue</Text>
                <Text style={styles.deckDescription}>
                  Snap points, drag handling, and interpolation stay off the JS
                  thread to keep motion stable under heavier render pressure.
                </Text>
              </Animated.View>

              <View style={styles.snapRail}>
                {(['expanded', 'peek', 'collapsed'] as const).map(level => (
                  <Pressable
                    key={level}
                    accessibilityRole="button"
                    onPress={() => {
                      handleDeckLevelPress(level);
                    }}
                    style={[
                      styles.snapButton,
                      deckLevel === level && styles.activeSnapButton,
                    ]}>
                    <Text
                      style={[
                        styles.snapButtonText,
                        deckLevel === level && styles.activeSnapButtonText,
                      ]}>
                      {level}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View style={styles.cardsColumn}>
                {commandCards.map(card => (
                  <View key={card.id} style={styles.commandCard}>
                    <View style={styles.commandHeader}>
                      <View style={styles.commandTextBlock}>
                        <Text style={styles.commandTitle}>{card.label}</Text>
                        <Text style={styles.commandMeta}>
                          Owner: {card.owner} | ETA: {card.eta}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.severityBadge,
                          card.severity === 'critical'
                            ? styles.criticalBadge
                            : card.severity === 'high'
                              ? styles.highBadge
                              : styles.mediumBadge,
                        ]}>
                        {card.severity}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </Animated.View>
          </GestureDetector>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default WorkspaceCommandDeck;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#0b1320',
  },
  screen: {
    flex: 1,
    backgroundColor: '#eef4fb',
    padding: 20,
  },
  heroCard: {
    borderRadius: 24,
    padding: 22,
    backgroundColor: '#111827',
    gap: 10,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#bfdbfe',
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#f8fafc',
  },
  heroDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#dbeafe',
  },
  statsRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
    backgroundColor: '#ffffff',
    gap: 8,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    textTransform: 'capitalize',
  },
  modeRail: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
  },
  modeChip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#dbe4f0',
  },
  activeModeChip: {
    backgroundColor: '#1d4ed8',
  },
  modeChipText: {
    color: '#334155',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  activeModeChipText: {
    color: '#eff6ff',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    top: 250,
    backgroundColor: '#0f172a',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  deckSurface: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: -20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 18,
    shadowColor: '#020617',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: -8,
    },
    elevation: 12,
  },
  handle: {
    alignSelf: 'center',
    height: 6,
    borderRadius: 999,
    backgroundColor: '#cbd5e1',
  },
  deckLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#1d4ed8',
  },
  deckTitle: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
  },
  deckDescription: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: '#475569',
  },
  snapRail: {
    flexDirection: 'row',
    gap: 10,
  },
  snapButton: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#e2e8f0',
  },
  activeSnapButton: {
    backgroundColor: '#0f172a',
  },
  snapButtonText: {
    color: '#334155',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  activeSnapButtonText: {
    color: '#f8fafc',
  },
  cardsColumn: {
    gap: 12,
  },
  commandCard: {
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#dbeafe',
    padding: 16,
  },
  commandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  commandTextBlock: {
    flex: 1,
    gap: 6,
  },
  commandTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
  },
  commandMeta: {
    fontSize: 14,
    color: '#475569',
  },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
    textTransform: 'capitalize',
    fontSize: 12,
    fontWeight: '700',
  },
  criticalBadge: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  highBadge: {
    backgroundColor: '#ffedd5',
    color: '#9a3412',
  },
  mediumBadge: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
});
