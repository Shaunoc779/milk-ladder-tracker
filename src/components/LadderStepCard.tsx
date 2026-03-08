import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LadderStep } from '../data/ladderSteps';
import { theme } from '../theme/theme';
import { getDaysOnStep } from '../utils/helpers';

interface LadderStepCardProps {
  step: LadderStep;
  status: 'completed' | 'current' | 'upcoming';
  ladderStartDate?: string;
}

export default function LadderStepCard({ step, status, ladderStartDate }: LadderStepCardProps) {
  const daysOnStep = status === 'current' && ladderStartDate ? getDaysOnStep(ladderStartDate) : null;

  return (
    <View style={[styles.card, status === 'current' && styles.cardCurrent, status === 'completed' && styles.cardCompleted]}>
      <View style={styles.header}>
        <View style={[styles.stepNumber, status === 'completed' && styles.stepNumberCompleted, status === 'current' && styles.stepNumberCurrent]}>
          {status === 'completed' ? (
            <Ionicons name="checkmark" size={16} color={theme.colors.white} />
          ) : (
            <Text style={styles.stepNumberText}>{step.step}</Text>
          )}
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.stepName, status === 'upcoming' && styles.textMuted]}>{step.name}</Text>
          {status === 'current' && daysOnStep !== null && (
            <Text style={styles.daysText}>Day {daysOnStep} of {step.minimumDays}+ required</Text>
          )}
        </View>
        {status === 'current' && (
          <View style={styles.currentBadge}>
            <Text style={styles.currentBadgeText}>Current</Text>
          </View>
        )}
      </View>

      {status !== 'upcoming' && (
        <>
          <Text style={[styles.description, status === 'completed' && styles.textMuted]}>{step.description}</Text>
          <Text style={styles.examplesTitle}>Examples:</Text>
          <View style={styles.examplesList}>
            {step.examples.map((example, i) => (
              <Text key={i} style={[styles.example, status === 'completed' && styles.textMuted]}>
                • {example}
              </Text>
            ))}
          </View>
        </>
      )}

      {status === 'upcoming' && (
        <Text style={styles.upcomingText}>Complete Step {step.step - 1} to unlock</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.border,
  },
  cardCurrent: {
    borderLeftColor: theme.colors.primary,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  cardCompleted: {
    borderLeftColor: theme.colors.success,
    opacity: 0.85,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  stepNumberCurrent: { backgroundColor: theme.colors.primary },
  stepNumberCompleted: { backgroundColor: theme.colors.success },
  stepNumberText: { fontSize: theme.fontSize.sm, fontWeight: 'bold', color: theme.colors.textLight },
  titleContainer: { flex: 1 },
  stepName: { fontSize: theme.fontSize.md, fontWeight: '600', color: theme.colors.text },
  daysText: { fontSize: theme.fontSize.xs, color: theme.colors.primary, marginTop: 2 },
  currentBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
  },
  currentBadgeText: { color: theme.colors.white, fontSize: theme.fontSize.xs, fontWeight: 'bold' },
  description: { fontSize: theme.fontSize.sm, color: theme.colors.textLight, marginBottom: theme.spacing.sm, lineHeight: 20 },
  examplesTitle: { fontSize: theme.fontSize.xs, fontWeight: '700', color: theme.colors.textLight, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: theme.spacing.xs },
  examplesList: {},
  example: { fontSize: theme.fontSize.sm, color: theme.colors.text, marginBottom: 2 },
  textMuted: { color: theme.colors.textMuted },
  upcomingText: { fontSize: theme.fontSize.xs, color: theme.colors.textMuted, fontStyle: 'italic' },
});
