import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useChild } from '../context/ChildContext';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme/theme';
import { ladderSteps } from '../data/ladderSteps';

export default function DashboardScreen({ navigation }: any) {
  const { selectedChild } = useChild();
  const { user } = useAuth();

  const currentStep = selectedChild?.currentLadderStep ?? 1;
  const stepInfo = ladderSteps.find((s) => s.step === currentStep);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Welcome Banner */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>
          👋 Hello, {user?.displayName?.split(' ')[0] ?? 'Parent'}!
        </Text>
        {selectedChild ? (
          <Text style={styles.childName}>{selectedChild.name}'s Progress</Text>
        ) : (
          <Text style={styles.noChildText}>No child profile set up yet</Text>
        )}
      </View>

      {/* Current Ladder Step */}
      <View style={styles.stepCard}>
        <View style={styles.stepHeader}>
          <Text style={styles.sectionTitle}>Current Ladder Step</Text>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>Step {currentStep} of 6</Text>
          </View>
        </View>
        {stepInfo && (
          <>
            <Text style={styles.stepName}>{stepInfo.name}</Text>
            <Text style={styles.stepDescription} numberOfLines={2}>
              {stepInfo.description}
            </Text>
          </>
        )}
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${(currentStep / 6) * 100}%` }]} />
        </View>
        <View style={styles.stepDots}>
          {ladderSteps.map((s) => (
            <View
              key={s.step}
              style={[
                styles.stepDot,
                s.step < currentStep && styles.stepDotCompleted,
                s.step === currentStep && styles.stepDotCurrent,
              ]}
            >
              {s.step < currentStep && (
                <Ionicons name="checkmark" size={10} color={theme.colors.white} />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Today's Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>Today's Summary</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Ionicons name="restaurant" size={24} color={theme.colors.primary} />
            <Text style={styles.summaryNumber}>0</Text>
            <Text style={styles.summaryLabel}>Milk Entries</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Ionicons name="checkmark-circle" size={24} color={theme.colors.success} />
            <Text style={styles.summaryNumber}>Good</Text>
            <Text style={styles.summaryLabel}>Day Status</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsCard}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('DailyLog')}
        >
          <Ionicons name="add-circle" size={20} color={theme.colors.white} />
          <Text style={styles.actionButtonText}>Log Today's Intake</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonSecondary]}
          onPress={() => navigation.navigate('History')}
        >
          <Ionicons name="time" size={20} color={theme.colors.primary} />
          <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
            View History
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
  },
  welcomeCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  welcomeText: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  childName: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  noChildText: {
    fontSize: theme.fontSize.md,
    color: 'rgba(255,255,255,0.8)',
  },
  stepCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text,
  },
  stepBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  stepBadgeText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.xs,
    fontWeight: 'bold',
  },
  stepName: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  stepDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    marginBottom: theme.spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  stepDots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotCompleted: {
    backgroundColor: theme.colors.success,
  },
  stepDotCurrent: {
    backgroundColor: theme.colors.primary,
  },
  summaryCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 50,
    backgroundColor: theme.colors.border,
  },
  summaryNumber: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.xs,
  },
  summaryLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
  },
  actionsCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  actionButtonSecondary: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  actionButtonText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
  actionButtonTextSecondary: {
    color: theme.colors.primary,
  },
});
