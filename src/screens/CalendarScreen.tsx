import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { theme } from '../theme/theme';
import { formatDate } from '../utils/helpers';

let CalendarComponent: React.ComponentType<any> | null = null;
if (Platform.OS !== 'web') {
  CalendarComponent = require('react-native-calendars').Calendar;
}

export default function CalendarScreen({ navigation }: any) {
  const today = formatDate(new Date());
  const [selectedDate, setSelectedDate] = useState(today);

  // Sample marked dates - in real app these come from Firestore
  const markedDates: Record<string, any> = {
    [today]: {
      selected: selectedDate === today,
      marked: false,
      selectedColor: theme.colors.primary,
    },
  };

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      {CalendarComponent ? (
        <CalendarComponent
          current={today}
          onDayPress={handleDayPress}
          markedDates={{
            ...markedDates,
            [selectedDate]: {
              selected: true,
              selectedColor: theme.colors.primary,
              marked: markedDates[selectedDate]?.marked,
            },
          }}
          theme={{
            backgroundColor: theme.colors.background,
            calendarBackground: theme.colors.card,
            textSectionTitleColor: theme.colors.textLight,
            selectedDayBackgroundColor: theme.colors.primary,
            selectedDayTextColor: theme.colors.white,
            todayTextColor: theme.colors.primary,
            dayTextColor: theme.colors.text,
            textDisabledColor: theme.colors.textMuted,
            arrowColor: theme.colors.primary,
            monthTextColor: theme.colors.text,
            indicatorColor: theme.colors.primary,
          }}
          style={styles.calendar}
        />
      ) : (
        <View style={[styles.calendar, styles.webCalendarFallback]}>
          <Text style={styles.webCalendarText}>Selected date: {selectedDate}</Text>
          {/* @ts-ignore - native HTML date input for web only */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e: any) => setSelectedDate(e.target.value)}
            style={{ fontSize: 16, padding: 8, borderRadius: 8, border: '1px solid #ccc', marginTop: 8 } as any}
          />
        </View>
      )}

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Legend</Text>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: theme.colors.success }]} />
          <Text style={styles.legendText}>Good day</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: theme.colors.danger }]} />
          <Text style={styles.legendText}>Flagged day (symptoms)</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: theme.colors.border }]} />
          <Text style={styles.legendText}>No data</Text>
        </View>
      </View>

      {/* Selected day action */}
      {selectedDate && (
        <View style={styles.selectedDayCard}>
          <Text style={styles.selectedDayText}>Selected: {selectedDate}</Text>
          <TouchableOpacity
            style={styles.viewLogButton}
            onPress={() => navigation.navigate('DailyLog', { date: selectedDate })}
          >
            <Text style={styles.viewLogButtonText}>View / Edit Log</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  calendar: {
    borderRadius: theme.borderRadius.lg,
    margin: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  webCalendarFallback: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  webCalendarText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  legend: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  legendTitle: { fontSize: theme.fontSize.sm, fontWeight: '600', color: theme.colors.text, marginBottom: theme.spacing.sm },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.xs },
  legendDot: { width: 12, height: 12, borderRadius: 6, marginRight: theme.spacing.sm },
  legendText: { fontSize: theme.fontSize.sm, color: theme.colors.textLight },
  selectedDayCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedDayText: { fontSize: theme.fontSize.sm, color: theme.colors.text },
  viewLogButton: { backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.md, paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.sm },
  viewLogButtonText: { color: theme.colors.white, fontSize: theme.fontSize.sm, fontWeight: '600' },
});
