import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { analyzeVideo } from './services/deepfakeDetector';

interface AnalysisResult {
  prediction: 'REAL' | 'FAKE';
  confidence: number;
  processingTime: number;
  framesAnalyzed: number;
}

export default function App() {
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const pickVideo = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need camera roll permissions to analyze videos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        setVideoUri(result.assets[0].uri);
        setResult(null);
      }
    } catch (error) {
      console.error('Error picking video:', error);
      Alert.alert('Error', 'Failed to pick video');
    }
  };

  const recordVideo = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need camera permissions to record videos.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        quality: 1,
        videoMaxDuration: 30,
      });

      if (!result.canceled && result.assets[0]) {
        setVideoUri(result.assets[0].uri);
        setResult(null);
      }
    } catch (error) {
      console.error('Error recording video:', error);
      Alert.alert('Error', 'Failed to record video');
    }
  };

  const handleAnalyze = async () => {
    if (!videoUri) {
      Alert.alert('No Video', 'Please select or record a video first.');
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      console.log('Starting analysis for video:', videoUri);
      const analysisResult = await analyzeVideo(videoUri);
      console.log('Analysis result:', analysisResult);
      setResult(analysisResult);
    } catch (error) {
      console.error('Error analyzing video:', error);
      Alert.alert(
        'Analysis Failed',
        'Failed to analyze the video. Please try again.\n\n' + 
        (error instanceof Error ? error.message : 'Unknown error')
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setVideoUri(null);
    setResult(null);
  };

  const getResultColor = () => {
    if (!result) return '#6B7280';
    return result.prediction === 'REAL' ? '#10B981' : '#EF4444';
  };

  const getResultIcon = () => {
    if (!result) return 'help-circle';
    return result.prediction === 'REAL' ? 'checkmark-circle' : 'close-circle';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={40} color="#8B5CF6" />
        <Text style={styles.title}>Deepfake Detector</Text>
        <Text style={styles.subtitle}>AI-Powered Video Verification</Text>
      </View>

      {videoUri && (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: videoUri }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        </View>
      )}

      {!videoUri && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton} onPress={pickVideo}>
            <Ionicons name="folder-open" size={24} color="white" />
            <Text style={styles.primaryButtonText}>Choose Video</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={recordVideo}>
            <Ionicons name="videocam" size={24} color="#8B5CF6" />
            <Text style={styles.secondaryButtonText}>Record Video</Text>
          </TouchableOpacity>
        </View>
      )}

      {videoUri && !result && (
        <TouchableOpacity
          style={[styles.analyzeButton, isAnalyzing && styles.analyzeButtonDisabled]}
          onPress={handleAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <ActivityIndicator color="white" size="small" />
              <Text style={styles.analyzeButtonText}>Analyzing...</Text>
            </>
          ) : (
            <>
              <Ionicons name="scan" size={24} color="white" />
              <Text style={styles.analyzeButtonText}>Analyze Video</Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {result && (
        <View style={styles.resultsContainer}>
          <View style={[styles.resultCard, { borderColor: getResultColor() }]}>
            <Ionicons name={getResultIcon()} size={60} color={getResultColor()} />
            <Text style={[styles.resultTitle, { color: getResultColor() }]}>
              {result.prediction}
            </Text>
            <Text style={styles.resultConfidence}>
              Confidence: {(result.confidence * 100).toFixed(2)}%
            </Text>
          </View>

          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Ionicons name="time" size={20} color="#6B7280" />
              <Text style={styles.detailText}>
                Processing Time: {result.processingTime.toFixed(2)}s
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="film" size={20} color="#6B7280" />
              <Text style={styles.detailText}>
                Frames Analyzed: {result.framesAnalyzed}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.resetButton} onPress={resetAnalysis}>
            <Ionicons name="refresh" size={20} color="#8B5CF6" />
            <Text style={styles.resetButtonText}>Analyze Another Video</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>📋 Demo Mode Active</Text>
        <Text style={styles.infoText}>
          Currently running in demo mode with simulated results.
        </Text>
        <Text style={styles.infoText}>
          To integrate real AI model:
        </Text>
        <Text style={styles.infoText}>
          1. Convert your trained model to TensorFlow.js format
        </Text>
        <Text style={styles.infoText}>
          2. Place model files in assets/model/
        </Text>
        <Text style={styles.infoText}>
          3. Uncomment code in services/deepfakeDetector.ts
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
  },
  videoContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  actionButtons: {
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    padding: 16,
    borderRadius: 12,
    gap: 10,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    gap: 10,
  },
  secondaryButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    padding: 18,
    borderRadius: 12,
    gap: 10,
  },
  analyzeButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  analyzeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultsContainer: {
    gap: 16,
  },
  resultCard: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 12,
  },
  resultConfidence: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
  detailsCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    gap: 8,
  },
  resetButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 6,
  },
});
