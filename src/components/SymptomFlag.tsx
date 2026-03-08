import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SymptomType } from '../models/types';
import { theme } from '../theme/theme';
import { capitalize } from '../utils/helpers';

interface SymptomFlagProps {
  symptom: SymptomType;
  active: boolean;
  onToggle: () => void;
}

export default function SymptomFlag({ symptom, active, onToggle }: SymptomFlagProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {capitalize(symptom)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    backgroundColor: theme.colors.background,
  },
  chipActive: {
    backgroundColor: theme.colors.danger,
    borderColor: theme.colors.danger,
  },
  chipText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
  },
  chipTextActive: {
    color: theme.colors.white,
    fontWeight: '600',
  },
});
