"use client";
import { useState, useRef } from "react";

export default function AIPhotoCropper() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Read file as base64
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Image = event.target?.result as string;
      setOriginalImage(base64Image);
      setError(null);
      
      // Automatically process the image
      await processImageWithAI(base64Image);
    };
    reader.readAsDataURL(file);
  };

  const processImageWithAI = async (imageData: string) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Extract base64 data without the data:image/jpeg;base64, prefix
      const base64Data = imageData.split(',')[1];

      // Call Claude API to analyze the image and get face coordinates
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: "image/jpeg",
                    data: base64Data
                  }
                },
                {
                  type: "text",
                  text: `Analyze this image and detect the main person's face for a passport-style photo crop.

Return ONLY a JSON object (no markdown, no explanation) with these coordinates:
{
  "faceDetected": true/false,
  "centerX": 0.5,
  "centerY": 0.3,
  "scale": 2.5
}

Where:
- centerX/centerY are the face center as fractions (0-1) of image width/height
- scale is how much to zoom (1.0 = no zoom, 2.0 = 2x zoom for close-up)
- For passport photos, aim for scale 2.5-4.0 to get a close headshot

If no clear face is detected, return faceDetected: false and use image center.`
                }
              ]
            }
          ]
        })
      });

      const data = await response.json();
      const aiResponse = data.content[0].text;
      
      // Parse AI response
      let faceData;
      try {
        // Remove any markdown formatting if present
        const cleanJson = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
        faceData = JSON.parse(cleanJson);
      } catch (parseError) {
        console.error("Parse error:", parseError);
        throw new Error("Could not parse AI response");
      }

      // Crop the image based on AI coordinates
      if (faceData.faceDetected) {
        await cropImage(imageData, faceData);
      } else {
        setError("No face detected. Using center crop.");
        await cropImage(imageData, { centerX: 0.5, centerY: 0.5, scale: 1.5 });
      }

    } catch (err) {
      console.error("AI processing error:", err);
      setError("Failed to process image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const cropImage = async (
    imageData: string,
    coords: { centerX: number; centerY: number; scale: number }
  ) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Passport photo standard: 2x2 inches at 300 DPI = 600x600px
        // We'll use 800x800 for better quality
        const outputSize = 800;
        canvas.width = outputSize;
        canvas.height = outputSize;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Calculate crop dimensions
        const imgWidth = img.width;
        const imgHeight = img.height;
        
        // Zoom level
        const cropSize = Math.min(imgWidth, imgHeight) / coords.scale;
        
        // Center point
        const centerX = imgWidth * coords.centerX;
        const centerY = imgHeight * coords.centerY;
        
        // Crop coordinates
        const sx = Math.max(0, centerX - cropSize / 2);
        const sy = Math.max(0, centerY - cropSize / 2);
        const sw = Math.min(cropSize, imgWidth - sx);
        const sh = Math.min(cropSize, imgHeight - sy);

        // Draw white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, outputSize, outputSize);

        // Draw cropped image
        ctx.drawImage(
          img,
          sx, sy, sw, sh,  // source rectangle
          0, 0, outputSize, outputSize  // destination rectangle
        );

        // Get the cropped image
        const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setCroppedImage(croppedDataUrl);
        resolve();
      };
      img.src = imageData;
    });
  };

  const reset = () => {
    setOriginalImage(null);
    setCroppedImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-6">
          <h2 className="text-2xl font-bold mb-2">🤖 AI Passport Photo Maker</h2>
          <p className="text-red-100 text-sm">
            Upload any photo - AI will automatically detect the face and create a perfect passport-size photo!
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          
          {/* Upload Section */}
          {!originalImage && (
            <div className="text-center">
              <label className="cursor-pointer">
                <div className="border-4 border-dashed border-gray-300 rounded-2xl p-12 hover:border-red-500 transition-all duration-300 hover:bg-red-50">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-4xl">📸</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900 mb-1">
                        Click to upload photo
                      </p>
                      <p className="text-sm text-gray-500">
                        Full body, group photo, landscape - anything works!
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                      Choose Photo
                    </div>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { icon: "🤖", title: "AI Powered", desc: "Automatic face detection" },
                  { icon: "✂️", title: "Smart Crop", desc: "Perfect passport size" },
                  { icon: "⚡", title: "Instant", desc: "Results in seconds" }
                ].map((feature, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-500">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-red-600 mb-4"></div>
              <p className="text-lg font-semibold text-gray-900 mb-2">🤖 AI is analyzing your photo...</p>
              <p className="text-sm text-gray-500">Detecting face and creating passport photo</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mb-6">
              <p className="text-sm text-yellow-800">⚠️ {error}</p>
            </div>
          )}

          {/* Results */}
          {originalImage && !isProcessing && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Original */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span>📤</span>
                    Original Photo
                  </h3>
                  <div className="bg-gray-100 rounded-xl overflow-hidden">
                    <img 
                      src={originalImage} 
                      alt="Original" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Cropped */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span>✨</span>
                    Passport Photo (AI Cropped)
                  </h3>
                  {croppedImage ? (
                    <div className="bg-white rounded-xl overflow-hidden border-2 border-green-500 shadow-lg">
                      <img 
                        src={croppedImage} 
                        alt="Passport" 
                        className="w-full h-auto"
                      />
                      <div className="bg-green-50 px-4 py-2 text-center">
                        <p className="text-xs font-semibold text-green-800">✓ Ready to use!</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                      <p className="text-gray-400">Processing...</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-center pt-4">
                <button
                  onClick={reset}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  ← Try Another Photo
                </button>
                {croppedImage && (
                  <a
                    href={croppedImage}
                    download="passport-photo.jpg"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    ⬇️ Download Passport Photo
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Hidden Canvas */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>💡</span>
          How It Works
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-4 rounded-xl">
            <div className="text-2xl mb-2">1️⃣</div>
            <p className="font-semibold text-gray-900 mb-1">Upload Any Photo</p>
            <p className="text-gray-600 text-xs">Group photo, full body, landscape - doesn't matter!</p>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <div className="text-2xl mb-2">2️⃣</div>
            <p className="font-semibold text-gray-900 mb-1">AI Detects Face</p>
            <p className="text-gray-600 text-xs">Claude AI finds your face and best crop position</p>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <div className="text-2xl mb-2">3️⃣</div>
            <p className="font-semibold text-gray-900 mb-1">Get Passport Photo</p>
            <p className="text-gray-600 text-xs">Perfect passport-size photo ready to use!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
