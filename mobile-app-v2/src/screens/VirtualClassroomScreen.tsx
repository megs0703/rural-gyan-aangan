import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Dimensions 
} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function VirtualClassroomScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isInClass, setIsInClass] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [participants] = useState(12);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const joinClass = async () => {
    if (!hasPermission) {
      Alert.alert('अनुमति आवश्यक', 'वर्चुअल क्लासरूम के लिए कैमरा की अनुमति चाहिए');
      return;
    }
    setIsInClass(true);
  };

  const leaveClass = () => {
    Alert.alert(
      'कक्षा छोड़ें',
      'क्या आप वाकई कक्षा छोड़ना चाहते हैं?',
      [
        { text: 'रद्द करें', style: 'cancel' },
        { text: 'हां', onPress: () => setIsInClass(false) }
      ]
    );
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>कैमरा अनुमति की जांच की जा रही है...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Ionicons name="camera-off" size={80} color="#EF4444" />
        <Text style={styles.errorText}>कैमरा की अनुमति नहीं मिली</Text>
        <Text style={styles.errorSubtext}>
          वर्चुअल क्लासरूम में भाग लेने के लिए कैमरा की अनुमति दें
        </Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => Camera.requestCameraPermissionsAsync()}
        >
          <Text style={styles.buttonText}>अनुमति दें</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!isInClass) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Ionicons name="videocam-outline" size={100} color="#3B82F6" />
          <Text style={styles.title}>वर्चुअल क्लासरूम</Text>
          <Text style={styles.subtitle}>
            अपने शिक्षकों और सहपाठियों के साथ लाइव कक्षाओं में भाग लें
          </Text>
          
          <View style={styles.classInfo}>
            <View style={styles.infoItem}>
              <Ionicons name="book" size={20} color="#3B82F6" />
              <Text style={styles.infoText}>गणित - कक्षा 10</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="person" size={20} color="#10B981" />
              <Text style={styles.infoText}>श्रीमती शर्मा</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="people" size={20} color="#F59E0B" />
              <Text style={styles.infoText}>{participants} छात्र ऑनलाइन</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.joinButton} onPress={joinClass}>
            <Ionicons name="videocam" size={24} color="white" />
            <Text style={styles.joinButtonText}>कक्षा में शामिल हों</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.classroomContainer}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.front}
      />
      
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.classTitle}>
          <Text style={styles.classText}>गणित - कक्षा 10</Text>
          <Text style={styles.participantCount}>{participants} छात्र</Text>
        </View>
        <TouchableOpacity style={styles.topButton}>
          <Ionicons name="chatbubbles" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Bottom Controls */}
      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.controlButton, isMuted && styles.mutedButton]}
          onPress={() => setIsMuted(!isMuted)}
        >
          <Ionicons 
            name={isMuted ? "mic-off" : "mic"} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, isVideoOff && styles.mutedButton]}
          onPress={() => setIsVideoOff(!isVideoOff)}
        >
          <Ionicons 
            name={isVideoOff ? "videocam-off" : "videocam"} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="hand-right" size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="share" size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, styles.leaveButton]} 
          onPress={leaveClass}
        >
          <Ionicons name="call" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Floating Action Buttons */}
      <TouchableOpacity style={styles.floatingButton}>
        <Ionicons name="chatbubbles" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#1e293b',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  classInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#1e293b',
    marginLeft: 12,
  },
  joinButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 12,
    gap: 10,
    width: '100%',
    justifyContent: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 20,
  },
  errorSubtext: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
  },
  classroomContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  topBar: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  classTitle: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 8,
  },
  classText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  participantCount: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
  },
  topButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    paddingHorizontal: 20,
  },
  controlButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mutedButton: {
    backgroundColor: '#EF4444',
  },
  leaveButton: {
    backgroundColor: '#EF4444',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 120,
    backgroundColor: '#3B82F6',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});