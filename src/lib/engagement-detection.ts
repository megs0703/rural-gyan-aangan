import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';

export interface EngagementMetrics {
  attentionScore: number;
  eyeGazeDirection: 'center' | 'left' | 'right' | 'up' | 'down';
  headPose: 'forward' | 'left' | 'right' | 'up' | 'down';
  blinkRate: number;
  isPresent: boolean;
  timestamp: number;
}

export class EngagementDetector {
  private faceMesh: FaceMesh;
  private camera: Camera | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private canvasElement: HTMLCanvasElement | null = null;
  private isRunning = false;
  private metrics: EngagementMetrics[] = [];
  private onMetricsUpdate?: (metrics: EngagementMetrics) => void;

  constructor() {
    this.faceMesh = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    });

    this.faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    this.faceMesh.onResults(this.onResults.bind(this));
  }

  async initialize(videoElement: HTMLVideoElement, canvasElement: HTMLCanvasElement) {
    this.videoElement = videoElement;
    this.canvasElement = canvasElement;

    try {
      this.camera = new Camera(videoElement, {
        onFrame: async () => {
          if (this.isRunning) {
            await this.faceMesh.send({ image: videoElement });
          }
        },
        width: 640,
        height: 480
      });
    } catch (error) {
      console.error('Failed to initialize camera:', error);
      throw error;
    }
  }

  start(onMetricsUpdate?: (metrics: EngagementMetrics) => void) {
    this.onMetricsUpdate = onMetricsUpdate;
    this.isRunning = true;
    this.camera?.start();
  }

  stop() {
    this.isRunning = false;
    this.camera?.stop();
  }

  private onResults(results: any) {
    if (!this.canvasElement || !results.multiFaceLandmarks) return;

    const canvasCtx = this.canvasElement.getContext('2d');
    if (!canvasCtx) return;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    if (results.multiFaceLandmarks.length > 0) {
      const landmarks = results.multiFaceLandmarks[0];
      const metrics = this.calculateEngagementMetrics(landmarks);
      
      this.metrics.push(metrics);
      if (this.metrics.length > 100) {
        this.metrics.shift(); // Keep only last 100 measurements
      }

      if (this.onMetricsUpdate) {
        this.onMetricsUpdate(metrics);
      }

      // Draw face landmarks for debugging
      this.drawLandmarks(canvasCtx, landmarks);
    } else {
      // No face detected
      const metrics: EngagementMetrics = {
        attentionScore: 0,
        eyeGazeDirection: 'center',
        headPose: 'forward',
        blinkRate: 0,
        isPresent: false,
        timestamp: Date.now()
      };

      if (this.onMetricsUpdate) {
        this.onMetricsUpdate(metrics);
      }
    }

    canvasCtx.restore();
  }

  private calculateEngagementMetrics(landmarks: any[]): EngagementMetrics {
    // Calculate attention score based on face orientation and eye gaze
    const attentionScore = this.calculateAttentionScore(landmarks);
    
    // Determine eye gaze direction
    const eyeGazeDirection = this.calculateEyeGaze(landmarks);
    
    // Determine head pose
    const headPose = this.calculateHeadPose(landmarks);
    
    // Calculate blink rate (simplified)
    const blinkRate = this.calculateBlinkRate(landmarks);

    return {
      attentionScore,
      eyeGazeDirection,
      headPose,
      blinkRate,
      isPresent: true,
      timestamp: Date.now()
    };
  }

  private calculateAttentionScore(landmarks: any[]): number {
    // Simplified attention calculation based on face orientation
    // In a real implementation, this would be more sophisticated
    
    // Get key facial points
    const noseTip = landmarks[1]; // Nose tip
    const leftEye = landmarks[33]; // Left eye corner
    const rightEye = landmarks[263]; // Right eye corner
    
    // Calculate face symmetry (indicates forward-facing)
    const eyeDistance = Math.abs(leftEye.x - rightEye.x);
    const faceWidth = 0.3; // Normalized face width when looking straight
    
    const symmetryScore = Math.min(eyeDistance / faceWidth, 1.0);
    
    // Calculate vertical alignment
    const eyeLevel = (leftEye.y + rightEye.y) / 2;
    const noseLevel = noseTip.y;
    const verticalAlignment = Math.max(0, 1 - Math.abs(eyeLevel - noseLevel) * 5);
    
    return Math.round((symmetryScore * 0.6 + verticalAlignment * 0.4) * 100);
  }

  private calculateEyeGaze(landmarks: any[]): 'center' | 'left' | 'right' | 'up' | 'down' {
    // Simplified gaze detection
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];
    const noseTip = landmarks[1];
    
    const eyeCenterX = (leftEye.x + rightEye.x) / 2;
    const horizontalOffset = eyeCenterX - noseTip.x;
    
    if (Math.abs(horizontalOffset) < 0.02) return 'center';
    return horizontalOffset > 0 ? 'right' : 'left';
  }

  private calculateHeadPose(landmarks: any[]): 'forward' | 'left' | 'right' | 'up' | 'down' {
    // Simplified head pose detection
    const noseTip = landmarks[1];
    const chin = landmarks[175];
    const forehead = landmarks[10];
    
    const verticalRatio = (noseTip.y - forehead.y) / (chin.y - forehead.y);
    
    if (verticalRatio < 0.4) return 'up';
    if (verticalRatio > 0.6) return 'down';
    return 'forward';
  }

  private calculateBlinkRate(landmarks: any[]): number {
    // Simplified blink detection
    // In a real implementation, this would track eye closure over time
    const leftEyeTop = landmarks[159];
    const leftEyeBottom = landmarks[145];
    const eyeHeight = Math.abs(leftEyeTop.y - leftEyeBottom.y);
    
    // Normal blink rate is around 15-20 blinks per minute
    return eyeHeight < 0.01 ? 25 : 15;
  }

  private drawLandmarks(ctx: CanvasRenderingContext2D, landmarks: any[]) {
    ctx.fillStyle = 'red';
    landmarks.forEach((landmark) => {
      ctx.beginPath();
      ctx.arc(
        landmark.x * ctx.canvas.width,
        landmark.y * ctx.canvas.height,
        1,
        0,
        2 * Math.PI
      );
      ctx.fill();
    });
  }

  getAverageEngagement(timeWindow: number = 60000): number {
    const now = Date.now();
    const recentMetrics = this.metrics.filter(
      m => now - m.timestamp < timeWindow
    );
    
    if (recentMetrics.length === 0) return 0;
    
    const avgAttention = recentMetrics.reduce((sum, m) => sum + m.attentionScore, 0) / recentMetrics.length;
    return Math.round(avgAttention);
  }

  getEngagementTrend(): 'increasing' | 'decreasing' | 'stable' {
    if (this.metrics.length < 10) return 'stable';
    
    const recent = this.metrics.slice(-5);
    const older = this.metrics.slice(-10, -5);
    
    const recentAvg = recent.reduce((sum, m) => sum + m.attentionScore, 0) / recent.length;
    const olderAvg = older.reduce((sum, m) => sum + m.attentionScore, 0) / older.length;
    
    const diff = recentAvg - olderAvg;
    
    if (diff > 5) return 'increasing';
    if (diff < -5) return 'decreasing';
    return 'stable';
  }
}

export default EngagementDetector;