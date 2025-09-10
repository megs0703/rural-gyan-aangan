import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { user } = useAuth();

  const features = [
    { 
      id: 1, 
      title: 'वर्चुअल क्लासरूम', 
      subtitle: 'लाइव कक्षाओं में भाग लें',
      icon: 'videocam', 
      color: '#3B82F6',
      screen: 'Classroom'
    },
    { 
      id: 2, 
      title: 'AI शिक्षक', 
      subtitle: 'तुरंत सवाल पूछें',
      icon: 'chatbubbles', 
      color: '#10B981',
      screen: 'AI Tutor'
    },
    { 
      id: 3, 
      title: 'कोड लैब', 
      subtitle: 'प्रोग्रामिंग सीखें',
      icon: 'code-slash', 
      color: '#F59E0B',
      screen: 'Code Lab'
    },
    { 
      id: 4, 
      title: 'परीक्षा', 
      subtitle: 'ऑनलाइन टेस्ट दें',
      icon: 'document-text', 
      color: '#EF4444',
      screen: 'Tests'
    },
  ];

  const quickStats = [
    { label: 'आज की कक्षाएं', value: '3', icon: 'calendar' },
    { label: 'पूर्ण पाठ', value: '12', icon: 'checkmark-circle' },
    { label: 'AI सवाल', value: '8', icon: 'help-circle' },
  ];

  const upcomingClasses = [
    { subject: 'गणित', time: '10:00 AM', teacher: 'श्रीमती शर्मा' },
    { subject: 'विज्ञान', time: '2:00 PM', teacher: 'श्री गुप्ता' },
    { subject: 'अंग्रेजी', time: '4:00 PM', teacher: 'मिस पटेल' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>नमस्ते, {user?.name}! 👋</Text>
          <Text style={styles.subtitle}>आज क्या सीखना चाहते हैं?</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        {quickStats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Ionicons name={stat.icon as any} size={24} color="#3B82F6" />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Features Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>मुख्य सुविधाएं</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature) => (
            <TouchableOpacity key={feature.id} style={styles.featureCard}>
              <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
                <Ionicons name={feature.icon as any} size={28} color="white" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Upcoming Classes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>आगामी कक्षाएं</Text>
        <View style={styles.classesContainer}>
          {upcomingClasses.map((cls, index) => (
            <TouchableOpacity key={index} style={styles.classCard}>
              <View style={styles.classInfo}>
                <Text style={styles.classSubject}>{cls.subject}</Text>
                <Text style={styles.classTeacher}>{cls.teacher}</Text>
              </View>
              <View style={styles.classTime}>
                <Ionicons name="time-outline" size={16} color="#64748b" />
                <Text style={styles.classTimeText}>{cls.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>हाल की गतिविधि</Text>
        <View style={styles.activityCard}>
          <View style={styles.activityItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.activityText}>गणित का पाठ 5 पूरा किया</Text>
          </View>
          <View style={styles.activityItem}>
            <Ionicons name="chatbubbles" size={20} color="#3B82F6" />
            <Text style={styles.activityText}>AI शिक्षक से 3 सवाल पूछे</Text>
          </View>
          <View style={styles.activityItem}>
            <Ionicons name="code-slash" size={20} color="#F59E0B" />
            <Text style={styles.activityText}>Python प्रोग्राम लिखा</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 5,
  },
  notificationButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 10,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 2,
  },
  section: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1e293b',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 60) / 2,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e293b',
    marginBottom: 5,
  },
  featureSubtitle: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  classesContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  classCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  classInfo: {
    flex: 1,
  },
  classSubject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  classTeacher: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  classTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classTimeText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 5,
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 10,
  },
});