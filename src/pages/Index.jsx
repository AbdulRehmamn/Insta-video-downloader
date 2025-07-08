import VideoDownloader from "@/components/VideoDownloader";
import FeatureGrid from "@/components/FeatureGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Social Video Downloader
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Download your favorite videos from Instagram and TikTok with ease. 
            Fast, secure, and completely free.
          </p>
        </div>
        
        <VideoDownloader />
        <FeatureGrid />
        
        <div className="text-center mt-12 p-6 bg-white/50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <h3 className="font-semibold">Copy URL</h3>
              <p className="text-gray-600">Copy the video URL from Instagram or TikTok</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <h3 className="font-semibold">Paste & Process</h3>
              <p className="text-gray-600">Paste the URL and click "Get Video" to process</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <h3 className="font-semibold">Download</h3>
              <p className="text-gray-600">Click download to save the video to your device</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;