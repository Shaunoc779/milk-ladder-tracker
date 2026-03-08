import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme/theme';

interface DayCellProps {
  date: string;
  status: 'good' | 'flagged' | 'empty';
  onPress?: (date: string) => void;
  isSelected?: boolean;
  isToday?: boolean;
}

export default function DayCell({ date, status, onPress, isSelected, isToday }: DayCellProps) {
  const day = new Date(date).getDate();

  return (
    <TouchableOpacity
      style={[styles.cell, isSelected && styles.cellSelected, isToday && styles.cellToday]}
      onPress={() => onPress?.(date)}
      activeOpacity={0.7}
    >
      <Text style={[styles.dayText, isSelected && styles.dayTextSelected, isToday && styles.dayTextToday]}>
        {day}
      </Text>
      {status !== 'empty' && (
        <View
          style={[
            styles.dot,
            status === 'good' && styles.dotGood,
            status === 'flagged' && styles.dotFlagged,
          ]}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  cellSelected: {
    backgroundColor: theme.colors.primary,
  },
  cellToday: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  dayText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
  dayTextSelected: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  dayTextToday: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    bottom: 3,
  },
  dotGood: {
    backgroundColor: theme.colors.success,
  },
  dotFlagged: {
    backgroundColor: theme.colors.danger,
  },
});
