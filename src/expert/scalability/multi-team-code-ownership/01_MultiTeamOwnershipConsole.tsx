import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import type {EscalationRule, OwnedCodeArea} from './ownershipContracts';
import {ownershipOperatingModel} from './ownershipModel';

function CodeAreaCard({area}: {area: OwnedCodeArea}): React.JSX.Element {
  return (
    <View style={styles.areaCard}>
      <Text style={styles.areaTitle}>{area.areaName}</Text>
      <Text style={styles.areaMeta}>
        {area.pathPattern} · {area.criticality}
      </Text>
      <Text style={styles.areaText}>Primary team: {area.primaryTeam}</Text>
      <Text style={styles.areaText}>Backup team: {area.backupTeam}</Text>
      {area.reviewRequirements.map(requirement => (
        <Text key={requirement} style={styles.areaRequirement}>
          • {requirement}
        </Text>
      ))}
    </View>
  );
}

function EscalationCard({
  rule,
}: {
  rule: EscalationRule;
}): React.JSX.Element {
  return (
    <View style={styles.escalationCard}>
      <Text style={styles.escalationTitle}>{rule.trigger}</Text>
      <Text style={styles.escalationText}>
        Participants: {rule.requiredParticipants.join(', ')}
      </Text>
      <Text style={styles.escalationText}>Resolution: {rule.resolutionPath}</Text>
    </View>
  );
}

function MultiTeamOwnershipConsole(): React.JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Expert Scalability</Text>
        <Text style={styles.title}>Multi-Team Ownership Console</Text>
        <Text style={styles.subtitle}>
          This topic models how a large mobile codebase stays workable when
          multiple teams share the same repository, release train, and failure surface.
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Owned code areas</Text>
        <Text style={styles.panelText}>
          Ownership needs to be explicit at the code-area level so review, incident
          handling, and breaking-change governance are predictable.
        </Text>
      </View>

      {ownershipOperatingModel.codeAreas.map(area => (
        <CodeAreaCard key={area.id} area={area} />
      ))}

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Escalation rules</Text>
        <Text style={styles.panelText}>
          Multi-team ownership fails when escalation is implicit. These rules show
          how cross-boundary, security-sensitive, and breaking-contract changes should surface.
        </Text>
      </View>

      {ownershipOperatingModel.escalationRules.map(rule => (
        <EscalationCard key={rule.id} rule={rule} />
      ))}

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Operating principles</Text>
        {ownershipOperatingModel.operatingPrinciples.map(principle => (
          <Text key={principle} style={styles.panelText}>
            • {principle}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 18,
    backgroundColor: '#020617',
  },
  hero: {
    gap: 6,
  },
  eyebrow: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    color: '#f8fafc',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
  },
  panel: {
    backgroundColor: '#0f172a',
    borderRadius: 20,
    padding: 18,
    gap: 8,
  },
  panelTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
  },
  panelText: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
  areaCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2563eb',
    padding: 16,
    gap: 6,
  },
  areaTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  areaMeta: {
    color: '#93c5fd',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  areaText: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
  areaRequirement: {
    color: '#dbeafe',
    fontSize: 13,
    lineHeight: 18,
  },
  escalationCard: {
    backgroundColor: '#111827',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#7c3aed',
    padding: 16,
    gap: 6,
  },
  escalationTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  escalationText: {
    color: '#ddd6fe',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default MultiTeamOwnershipConsole;
