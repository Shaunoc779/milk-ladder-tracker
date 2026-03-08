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
import { useAuth } from '../context/AuthContext';
import { useChild } from '../context/ChildContext';
import { signOut } from '../services/authService';
import { theme } from '../theme/theme';

export default function SettingsScreen() {
  const { user } = useAuth();
  const { selectedChild, setSelectedChild } = useChild();
  const [childName, setChildName] = useState(selectedChild?.name ?? '');
  const [partnerEmail, setPartnerEmail] = useState('');

  const handleInvitePartner = () => {
    if (!partnerEmail) {
      Alert.alert('Error', 'Please enter your partner\'s email.');
      return;
    }
    Alert.alert('Invite Sent', `An invitation has been sent to ${partnerEmail}.`);
    setPartnerEmail('');
  };

  const handleResetLadder = () => {
    Alert.alert(
      'Reset Ladder',
      'Are you sure you want to reset the ladder progress to Step 1? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            if (selectedChild) {
              setSelectedChild({ ...selectedChild, currentLadderStep: 1 });
              Alert.alert('Reset', 'Ladder progress has been reset to Step 1.');
            }
          },
        },
      ]
    );
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => signOut() },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👤 Account</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{user?.displayName ?? '—'}</Text>
          </View>
          <View style={[styles.infoRow, { borderTopWidth: 1, borderTopColor: theme.colors.border }]}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email ?? '—'}</Text>
          </View>
        </View>
      </View>

      {/* Child profile */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧒 Child Profile</Text>
        <View style={styles.card}>
          <Text style={styles.formLabel}>Child's Name</Text>
          <TextInput
            style={styles.input}
            value={childName}
            onChangeText={setChildName}
            placeholder="Enter child's name"
            placeholderTextColor={theme.colors.textMuted}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              if (selectedChild) {
                setSelectedChild({ ...selectedChild, name: childName });
                Alert.alert('Saved', 'Child profile updated.');
              }
            }}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Invite partner */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👨‍👩‍👧 Partner Sharing</Text>
        <View style={styles.card}>
          <Text style={styles.formLabel}>Invite Partner by Email</Text>
          <TextInput
            style={styles.input}
            value={partnerEmail}
            onChangeText={setPartnerEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="partner@example.com"
            placeholderTextColor={theme.colors.textMuted}
          />
          <TouchableOpacity style={styles.inviteButton} onPress={handleInvitePartner}>
            <Ionicons name="mail" size={16} color={theme.colors.white} />
            <Text style={styles.inviteButtonText}>Send Invite</Text>
          </TouchableOpacity>
          <Text style={styles.partnerNote}>
            Your partner will receive an email to join and access the shared log.
          </Text>
        </View>
      </View>

      {/* Danger zone */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚠️ Danger Zone</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.dangerButton} onPress={handleResetLadder}>
            <Ionicons name="refresh" size={16} color={theme.colors.danger} />
            <Text style={styles.dangerButtonText}>Reset Ladder Progress</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ About</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>App Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={[styles.infoRow, { borderTopWidth: 1, borderTopColor: theme.colors.border }]}>
            <Text style={styles.infoLabel}>Based on</Text>
            <Text style={styles.infoValue}>iMAP Milk Ladder</Text>
          </View>
        </View>
      </View>

      {/* Sign out */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Ionicons name="log-out" size={18} color={theme.colors.white} />
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.md, paddingBottom: theme.spacing.xl },
  section: { marginBottom: theme.spacing.md },
  sectionTitle: { fontSize: theme.fontSize.sm, fontWeight: '700', color: theme.colors.textLight, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: theme.spacing.sm },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: theme.spacing.sm },
  infoLabel: { fontSize: theme.fontSize.sm, color: theme.colors.textLight },
  infoValue: { fontSize: theme.fontSize.sm, color: theme.colors.text, fontWeight: '500' },
  formLabel: { fontSize: theme.fontSize.sm, fontWeight: '600', color: theme.colors.text, marginBottom: theme.spacing.xs },
  input: { borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.md, padding: theme.spacing.sm, fontSize: theme.fontSize.sm, color: theme.colors.text, marginBottom: theme.spacing.sm, backgroundColor: theme.colors.background },
  saveButton: { backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.md, padding: theme.spacing.sm, alignItems: 'center' },
  saveButtonText: { color: theme.colors.white, fontWeight: '600', fontSize: theme.fontSize.sm },
  inviteButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.secondary, borderRadius: theme.borderRadius.md, padding: theme.spacing.sm },
  inviteButtonText: { color: theme.colors.white, fontWeight: '600', fontSize: theme.fontSize.sm, marginLeft: theme.spacing.xs },
  partnerNote: { fontSize: theme.fontSize.xs, color: theme.colors.textMuted, marginTop: theme.spacing.sm, textAlign: 'center' },
  dangerButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.colors.danger, borderRadius: theme.borderRadius.md, padding: theme.spacing.sm },
  dangerButtonText: { color: theme.colors.danger, fontWeight: '600', fontSize: theme.fontSize.sm, marginLeft: theme.spacing.xs },
  signOutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.danger, borderRadius: theme.borderRadius.md, padding: theme.spacing.md, marginBottom: theme.spacing.md },
  signOutButtonText: { color: theme.colors.white, fontWeight: 'bold', fontSize: theme.fontSize.md, marginLeft: theme.spacing.sm },
});
