import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useChild } from '../context/ChildContext';
import { ladderSteps } from '../data/ladderSteps';
import LadderStepCard from '../components/LadderStepCard';
import { theme } from '../theme/theme';

export default function LadderProgressScreen() {
  const { selectedChild, setSelectedChild } = useChild();
  const currentStep = selectedChild?.currentLadderStep ?? 1;

  const handleAdvanceStep = () => {
    if (currentStep >= 6) {
      Alert.alert('🎉 Congratulations!', 'Your child has completed the full milk ladder!');
      return;
    }
    Alert.alert(
      'Advance to Next Step',
      `Are you sure you want to move to Step ${currentStep + 1}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Advance',
          onPress: () => {
            if (selectedChild) {
              setSelectedChild({ ...selectedChild, currentLadderStep: currentStep + 1 });
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>🪜 Milk Ladder Progress</Text>
        <Text style={styles.headerSubtitle}>
          {selectedChild?.name ?? 'Your child'} is on Step {currentStep} of 6
        </Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${(currentStep / 6) * 100}%` }]} />
        </View>
      </View>

      {/* Steps */}
      {ladderSteps.map((step) => (
        <LadderStepCard
          key={step.step}
          step={step}
          status={
            step.step < currentStep
              ? 'completed'
              : step.step === currentStep
              ? 'current'
              : 'upcoming'
          }
          ladderStartDate={selectedChild?.ladderStartDate}
        />
      ))}

      {/* Advance button */}
      {currentStep < 6 && (
        <TouchableOpacity style={styles.advanceButton} onPress={handleAdvanceStep}>
          <Ionicons name="arrow-forward-circle" size={20} color={theme.colors.white} />
          <Text style={styles.advanceButtonText}>Advance to Step {currentStep + 1}</Text>
        </TouchableOpacity>
      )}
      {currentStep === 6 && (
        <View style={styles.completedBanner}>
          <Ionicons name="trophy" size={32} color={theme.colors.secondary} />
          <Text style={styles.completedText}>Milk Ladder Complete! 🎉</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.md, paddingBottom: theme.spacing.xl },
  headerCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  headerTitle: { fontSize: theme.fontSize.xl, fontWeight: 'bold', color: theme.colors.white, marginBottom: theme.spacing.xs },
  headerSubtitle: { fontSize: theme.fontSize.md, color: 'rgba(255,255,255,0.85)', marginBottom: theme.spacing.md },
  progressBarContainer: { height: 8, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 4 },
  progressBar: { height: 8, backgroundColor: theme.colors.white, borderRadius: 4 },
  advanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.success,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  advanceButtonText: { color: theme.colors.white, fontSize: theme.fontSize.md, fontWeight: 'bold', marginLeft: theme.spacing.sm },
  completedBanner: { alignItems: 'center', padding: theme.spacing.lg },
  completedText: { fontSize: theme.fontSize.lg, fontWeight: 'bold', color: theme.colors.text, marginTop: theme.spacing.sm },
});
