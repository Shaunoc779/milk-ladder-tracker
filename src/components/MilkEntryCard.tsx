import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MilkEntry } from '../models/types';
import { theme } from '../theme/theme';
import { formatTime } from '../utils/helpers';

interface MilkEntryCardProps {
  entry: MilkEntry;
}

export default function MilkEntryCard({ entry }: MilkEntryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name="restaurant" size={20} color={theme.colors.primary} />
      </View>
      <View style={styles.info}>
        <Text style={styles.type}>{entry.type}</Text>
        <Text style={styles.description}>{entry.description}</Text>
        <Text style={styles.quantity}>Quantity: {entry.quantity}</Text>
      </View>
      <Text style={styles.time}>{formatTime(entry.time)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  info: {
    flex: 1,
  },
  type: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 2,
  },
  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    marginBottom: 2,
  },
  quantity: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
  },
  time: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    fontWeight: '500',
  },
});
