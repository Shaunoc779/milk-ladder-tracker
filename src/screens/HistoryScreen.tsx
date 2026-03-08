import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { DailyLog, SymptomType } from '../models/types';
import { capitalize } from '../utils/helpers';

const SAMPLE_LOGS: DailyLog[] = [
  {
    id: '1',
    childId: 'child1',
    date: '2024-01-15',
    milkEntries: [{ id: 'e1', type: 'Baked milk', description: 'Malted milk biscuits', quantity: '3 biscuits', time: '09:00', ladderStep: 1 }],
    flagged: false,
    symptoms: [],
    notes: 'Tolerated well, no reactions.',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
  },
  {
    id: '2',
    childId: 'child1',
    date: '2024-01-16',
    milkEntries: [{ id: 'e2', type: 'Baked milk', description: 'Homemade muffin', quantity: '1 muffin', time: '10:30', ladderStep: 1 }],
    flagged: true,
    symptoms: ['skin_outbreak', 'irritability'],
    notes: 'Mild rash on cheeks after 2 hours.',
    createdAt: '2024-01-16T10:30:00Z',
    updatedAt: '2024-01-16T14:00:00Z',
  },
];

const FILTER_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'All', value: 'all' },
  { label: 'Flagged', value: 'flagged' },
  { label: 'No Reaction', value: 'good' },
];

export default function HistoryScreen({ navigation }: any) {
  const [filter, setFilter] = useState('all');

  const filteredLogs = SAMPLE_LOGS.filter((log) => {
    if (filter === 'flagged') return log.flagged;
    if (filter === 'good') return !log.flagged;
    return true;
  });

  const renderItem = ({ item }: { item: DailyLog }) => (
    <TouchableOpacity
      style={[styles.logCard, item.flagged && styles.logCardFlagged]}
      onPress={() => navigation.navigate('DailyLog', { date: item.date })}
    >
      <View style={styles.logHeader}>
        <Text style={styles.logDate}>{item.date}</Text>
        {item.flagged && (
          <View style={styles.flagBadge}>
            <Ionicons name="flag" size={12} color={theme.colors.white} />
            <Text style={styles.flagBadgeText}>Flagged</Text>
          </View>
        )}
      </View>
      <View style={styles.logStats}>
        <View style={styles.logStat}>
          <Ionicons name="restaurant" size={14} color={theme.colors.textMuted} />
          <Text style={styles.logStatText}>{item.milkEntries.length} entries</Text>
        </View>
        {item.symptoms.length > 0 && (
          <View style={styles.logStat}>
            <Ionicons name="alert-circle" size={14} color={theme.colors.danger} />
            <Text style={[styles.logStatText, { color: theme.colors.danger }]}>
              {item.symptoms.map(capitalize).join(', ')}
            </Text>
          </View>
        )}
      </View>
      {item.notes ? (
        <Text style={styles.logNotes} numberOfLines={2}>
          {item.notes}
        </Text>
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Filter tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer} contentContainerStyle={styles.filterContent}>
        {FILTER_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[styles.filterChip, filter === option.value && styles.filterChipActive]}
            onPress={() => setFilter(option.value)}
          >
            <Text style={[styles.filterChipText, filter === option.value && styles.filterChipTextActive]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredLogs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={48} color={theme.colors.textMuted} />
            <Text style={styles.emptyText}>No logs found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  filterContainer: { maxHeight: 56, backgroundColor: theme.colors.card, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  filterContent: { paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.sm, gap: theme.spacing.sm },
  filterChip: { borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.xl, paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.xs },
  filterChipActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  filterChipText: { fontSize: theme.fontSize.sm, color: theme.colors.text },
  filterChipTextActive: { color: theme.colors.white },
  listContent: { padding: theme.spacing.md },
  logCard: {
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
    borderLeftColor: theme.colors.success,
  },
  logCardFlagged: { borderLeftColor: theme.colors.danger },
  logHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.xs },
  logDate: { fontSize: theme.fontSize.md, fontWeight: '600', color: theme.colors.text },
  flagBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.danger, borderRadius: theme.borderRadius.xl, paddingHorizontal: theme.spacing.sm, paddingVertical: 2 },
  flagBadgeText: { color: theme.colors.white, fontSize: theme.fontSize.xs, marginLeft: 2 },
  logStats: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md, marginBottom: theme.spacing.xs },
  logStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  logStatText: { fontSize: theme.fontSize.xs, color: theme.colors.textMuted },
  logNotes: { fontSize: theme.fontSize.xs, color: theme.colors.textLight, fontStyle: 'italic' },
  emptyContainer: { alignItems: 'center', paddingTop: 80 },
  emptyText: { fontSize: theme.fontSize.md, color: theme.colors.textMuted, marginTop: theme.spacing.md },
});
