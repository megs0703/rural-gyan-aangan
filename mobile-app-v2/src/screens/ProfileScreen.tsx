import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ScrollView,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const handleLogout = () => {
    Alert.alert(
      'लॉगआउट',
      'क्या आप वाकई लॉगआउट करना चाहते हैं?',
      [
        { text: 'रद्द करें', style: 'cancel' },
        { text: 'लॉगआउट', onPress: logout, style: 'destructive' }
      ]
    );
  };

  const profileStats = [
    { label: 'पूर्ण पाठ', value: '24', icon: 'checkmark-circle', color: '#10B981' },
    { label: 'कुल घंटे', value: '48', icon: 'time', color: '#3B82F6' },
    { label: 'AI सवाल', value: '156', icon: 'chatbubbles', color: '#F59E0B' },
    { label: 'कोड प्रोजेक्ट', value: '12', icon: 'code-slash', color: '#8B5CF6' },
  ];

  const menuSections = [
    {
      title: 'खाता',
      items: [
        { id: 1, title: 'प्रोफाइल संपादित करें', icon: 'person-outline', onPress: () => {} },
        { id: 2, title: t('language'), icon: 'language-outline', onPress: () => {} },
        { id: 3, title: 'पासवर्ड बदलें', icon: 'lock-closed-outline', onPress: () => {} },
      ]
    },
    {
      title: t('settings'),
      items: [
        { 
          id: 4, 
          title: 'सूचनाएं', 
          icon: 'notifications-outline', 
          hasSwitch: true,
          switchValue: notificationsEnabled,
          onSwitchChange: setNotificationsEnabled
        },
        { 
          id: 5, 
          title: 'डार्क मोड', 
          icon: 'moon-outline', 
          hasSwitch: true,
          switchValue: darkMode,
          onSwitchChange: setDarkMode
        },
        { id: 6, title: 'डेटा उपयोग', icon: 'cellular-outline', onPress: () => {} },
      ]
    },
    {
      title: 'सहायता',
      items: [
        { id: 7, title: 'सहायता केंद्र', icon: 'help-circle-outline', onPress: () => {} },
        { id: 8, title: 'फीडबैक भेजें', icon: 'chatbox-outline', onPress: () => {} },
        { id: 9, title: 'ऐप के बारे में', icon: 'information-circle-outline', onPress: () => {} },
      ]
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={50} color="#3B82F6" />
          </View>
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="camera" size={16} color="white" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        <View style={styles.userRole}>
          <Ionicons name="school" size={16} color="#3B82F6" />
          <Text style={styles.roleText}>
            {user?.role === 'student' ? 'छात्र' : 'शिक्षक'}
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>आपकी प्रगति</Text>
        <View style={styles.statsGrid}>
          {profileStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                <Ionicons name={stat.icon as any} size={20} color="white" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Menu Sections */}
      {menuSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.menuSection}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.menuContainer}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity 
                key={item.id} 
                style={[
                  styles.menuItem,
                  itemIndex === section.items.length - 1 && styles.lastMenuItem
                ]}
                onPress={item.onPress}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons name={item.icon as any} size={24} color="#64748b" />
                  <Text style={styles.menuText}>{item.title}</Text>
                </View>
                
                {item.hasSwitch ? (
                  <Switch
                    value={item.switchValue}
                    onValueChange={item.onSwitchChange}
                    trackColor={{ false: '#e2e8f0', true: '#3B82F6' }}
                    thumbColor={item.switchValue ? '#ffffff' : '#f4f3f4'}
                  />
                ) : (
                  <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Logout Button */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#EF4444" />
          <Text style={styles.logoutText}>{t('logout')}</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>शिक्षा सेतु</Text>
        <Text style={styles.footerVersion}>संस्करण 1.0.0</Text>
        <Text style={styles.footerSubtext}>
          ग्रामीण शिक्षा के लिए डिजिटल प्लेटफॉर्म
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  profileHeader: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 30,
    paddingTop: 50,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#3B82F6',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3B82F6',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 10,
  },
  userRole: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  roleText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginLeft: 5,
  },
  statsContainer: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  menuSection: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64748b',
    marginBottom: 10,
    marginLeft: 5,
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    color: '#1e293b',
    marginLeft: 15,
  },
  logoutSection: {
    margin: 15,
  },
  logoutButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fee2e2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 10,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    padding: 30,
    paddingBottom: 50,
  },
  footerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 5,
  },
  footerVersion: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
});