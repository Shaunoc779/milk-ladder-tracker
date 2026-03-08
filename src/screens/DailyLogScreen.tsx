import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { SymptomType } from '../models/types';
import SymptomFlag from '../components/SymptomFlag';
import { formatDate } from '../utils/helpers';

const SYMPTOM_TYPES: SymptomType[] = [
  'skin_outbreak',
  'eczema',
  'diarrhoea',
  'vomiting',
  'reflux',
  'bloating',
  'hives',
  'congestion',
  'irritability',
  'other',
];

const MILK_TYPES = [
  'Baked milk',
  'Cooked milk',
  'Soft cheese',
  'Yoghurt',
  'Fresh milk',
  'Other dairy',
];

export default function DailyLogScreen() {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [milkEntries, setMilkEntries] = useState<Array<{ type: string; description: string; quantity: string; time: string }>>([]);
  const [flagged, setFlagged] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomType[]>([]);
  const [notes, setNotes] = useState('');
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [entryType, setEntryType] = useState(MILK_TYPES[0]);
  const [entryDescription, setEntryDescription] = useState('');
  const [entryQuantity, setEntryQuantity] = useState('');
  const [entryTime, setEntryTime] = useState('');

  const toggleSymptom = (symptom: SymptomType) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
    if (!flagged) setFlagged(true);
  };

  const addEntry = () => {
    if (!entryDescription || !entryQuantity) {
      Alert.alert('Error', 'Please fill in description and quantity.');
      return;
    }
    const resolvedTime = entryTime || new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    setMilkEntries((prev) => [
      ...prev,
      { type: entryType, description: entryDescription, quantity: entryQuantity, time: resolvedTime },
    ]);
    setEntryDescription('');
    setEntryQuantity('');
    setEntryTime('');
    setShowAddEntry(false);
  };

  const handleSave = () => {
    Alert.alert('Saved', 'Daily log saved successfully!');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Date */}
      <View style={styles.dateCard}>
        <Ionicons name="calendar" size={20} color={theme.colors.primary} />
        <Text style={styles.dateText}>{selectedDate}</Text>
      </View>

      {/* Milk Entries */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>🥛 Milk Entries</Text>
          <TouchableOpacity onPress={() => setShowAddEntry(true)} style={styles.addButton}>
            <Ionicons name="add" size={20} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
        {milkEntries.length === 0 ? (
          <Text style={styles.emptyText}>No entries yet. Tap + to add one.</Text>
        ) : (
          milkEntries.map((entry, index) => (
            <View key={index} style={styles.entryRow}>
              <Ionicons name="restaurant" size={16} color={theme.colors.primary} />
              <View style={styles.entryInfo}>
                <Text style={styles.entryType}>{entry.type}</Text>
                <Text style={styles.entryDesc}>{entry.description} — {entry.quantity}</Text>
              </View>
              <Text style={styles.entryTime}>{entry.time}</Text>
            </View>
          ))
        )}

        {showAddEntry && (
          <View style={styles.addEntryForm}>
            <Text style={styles.formLabel}>Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
              {MILK_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.typeChip, entryType === type && styles.typeChipSelected]}
                  onPress={() => setEntryType(type)}
                >
                  <Text style={[styles.typeChipText, entryType === type && styles.typeChipTextSelected]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text style={styles.formLabel}>Description</Text>
            <TextInput style={styles.input} value={entryDescription} onChangeText={setEntryDescription} placeholder="e.g. Malted milk biscuits" placeholderTextColor={theme.colors.textMuted} />
            <Text style={styles.formLabel}>Quantity</Text>
            <TextInput style={styles.input} value={entryQuantity} onChangeText={setEntryQuantity} placeholder="e.g. 2 biscuits, 100ml" placeholderTextColor={theme.colors.textMuted} />
            <Text style={styles.formLabel}>Time</Text>
            <TextInput style={styles.input} value={entryTime} onChangeText={setEntryTime} placeholder="HH:MM" placeholderTextColor={theme.colors.textMuted} />
            <View style={styles.formActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddEntry(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveEntryButton} onPress={addEntry}>
                <Text style={styles.saveEntryButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Symptoms */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>🚨 Symptoms</Text>
          <TouchableOpacity
            style={[styles.flagToggle, flagged && styles.flagToggleActive]}
            onPress={() => setFlagged(!flagged)}
          >
            <Ionicons name={flagged ? 'flag' : 'flag-outline'} size={18} color={flagged ? theme.colors.white : theme.colors.danger} />
            <Text style={[styles.flagToggleText, flagged && styles.flagToggleTextActive]}>
              {flagged ? 'Flagged' : 'Flag Day'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.symptomsGrid}>
          {SYMPTOM_TYPES.map((symptom) => (
            <SymptomFlag
              key={symptom}
              symptom={symptom}
              active={selectedSymptoms.includes(symptom)}
              onToggle={() => toggleSymptom(symptom)}
            />
          ))}
        </View>
      </View>

      {/* Notes */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📝 Notes</Text>
        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add any observations, reactions, or notes about today..."
          placeholderTextColor={theme.colors.textMuted}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Ionicons name="save" size={20} color={theme.colors.white} />
        <Text style={styles.saveButtonText}>Save Log</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.md, paddingBottom: theme.spacing.xl },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  dateText: { fontSize: theme.fontSize.md, color: theme.colors.text, marginLeft: theme.spacing.sm, fontWeight: '600' },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.sm },
  sectionTitle: { fontSize: theme.fontSize.md, fontWeight: '600', color: theme.colors.text },
  addButton: { backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.sm, padding: 4 },
  emptyText: { color: theme.colors.textMuted, fontSize: theme.fontSize.sm, textAlign: 'center', padding: theme.spacing.md },
  entryRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: theme.spacing.sm, borderTopWidth: 1, borderTopColor: theme.colors.border },
  entryInfo: { flex: 1, marginLeft: theme.spacing.sm },
  entryType: { fontSize: theme.fontSize.sm, fontWeight: '600', color: theme.colors.text },
  entryDesc: { fontSize: theme.fontSize.xs, color: theme.colors.textLight },
  entryTime: { fontSize: theme.fontSize.xs, color: theme.colors.textMuted },
  addEntryForm: { marginTop: theme.spacing.md, borderTopWidth: 1, borderTopColor: theme.colors.border, paddingTop: theme.spacing.md },
  formLabel: { fontSize: theme.fontSize.sm, fontWeight: '600', color: theme.colors.text, marginBottom: theme.spacing.xs },
  typeScroll: { marginBottom: theme.spacing.sm },
  typeChip: { borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.xl, paddingHorizontal: theme.spacing.sm, paddingVertical: 4, marginRight: theme.spacing.xs },
  typeChipSelected: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  typeChipText: { fontSize: theme.fontSize.xs, color: theme.colors.text },
  typeChipTextSelected: { color: theme.colors.white },
  input: { borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.md, padding: theme.spacing.sm, fontSize: theme.fontSize.sm, color: theme.colors.text, marginBottom: theme.spacing.sm, backgroundColor: theme.colors.background },
  formActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: theme.spacing.sm },
  cancelButton: { padding: theme.spacing.sm, borderRadius: theme.borderRadius.md, borderWidth: 1, borderColor: theme.colors.border },
  cancelButtonText: { color: theme.colors.textLight, fontSize: theme.fontSize.sm },
  saveEntryButton: { backgroundColor: theme.colors.primary, padding: theme.spacing.sm, borderRadius: theme.borderRadius.md, paddingHorizontal: theme.spacing.md },
  saveEntryButtonText: { color: theme.colors.white, fontSize: theme.fontSize.sm, fontWeight: '600' },
  flagToggle: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.danger, borderRadius: theme.borderRadius.xl, paddingHorizontal: theme.spacing.sm, paddingVertical: 4 },
  flagToggleActive: { backgroundColor: theme.colors.danger },
  flagToggleText: { color: theme.colors.danger, fontSize: theme.fontSize.xs, marginLeft: 4 },
  flagToggleTextActive: { color: theme.colors.white },
  symptomsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.xs, marginTop: theme.spacing.sm },
  notesInput: { borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.md, padding: theme.spacing.md, fontSize: theme.fontSize.sm, color: theme.colors.text, minHeight: 100, textAlignVertical: 'top', backgroundColor: theme.colors.background },
  saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.md, padding: theme.spacing.md, marginBottom: theme.spacing.md },
  saveButtonText: { color: theme.colors.white, fontSize: theme.fontSize.md, fontWeight: 'bold', marginLeft: theme.spacing.sm },
});
