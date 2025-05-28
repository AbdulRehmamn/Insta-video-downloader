
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Instagram, Loader2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

interface VideoData {
  title?: string;
  thumbnail?: string;
  download_url?: string;
  duration?: string;
  author?: string;
  play?: string; // For TikTok videos
  wmplay?: string; // For TikTok videos with watermark
  hdplay?: string; // For TikTok HD videos
}

const VideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const { toast } = useToast();

  const detectPlatform = (url: string) => {
    if (url.includes('instagram.com')) return 'Instagram';
    if (url.includes('tiktok.com')) return 'TikTok';
    return 'Unknown';
  };

  const downloadInstagramVideo = async (url: string) => {
    const options = {
      method: 'GET',
      url: 'https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi',
      params: {
        url: url
      },
      headers: {
        'x-rapidapi-key': '65560d6fd6msha21d1fb7df6c45cp165b1djsn3b50ced25f83',
        'x-rapidapi-host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    return response.data;
  };

  const downloadTikTokVideo = async (url: string) => {
    const options = {
      method: 'GET',
      url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/',
      params: {
        url: url,
        hd: '1'
      },
      headers: {
        'x-rapidapi-key': '65560d6fd6msha21d1fb7df6c45cp165b1djsn3b50ced25f83',
        'x-rapidapi-host': 'tiktok-video-no-watermark2.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    return response.data;
  };

  const downloadVideo = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    const platform = detectPlatform(url);
    if (platform === 'Unknown') {
      toast({
        title: "Error",
        description: "Please enter a valid Instagram or TikTok URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setVideoData(null);

    try {
      let response;
      
      if (platform === 'Instagram') {
        response = await downloadInstagramVideo(url);
      } else if (platform === 'TikTok') {
        response = await downloadTikTokVideo(url);
      }

      console.log('API Response:', response);
      
      if (response) {
        setVideoData(response);
        toast({
          title: "Success!",
          description: `${platform} video information fetched successfully`,
        });
      } else {
        throw new Error('No data received');
      }
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: `Failed to fetch ${platform} video information. Please check the URL and try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (downloadUrl: string, filename?: string) => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'video';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Started",
      description: "Your video download has started",
    });
  };

  const platform = detectPlatform(url);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <Instagram className="w-8 h-8 text-purple-600" />
            Video Downloader
          </CardTitle>
          <p className="text-gray-600">Download videos from Instagram and TikTok</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Paste Instagram or TikTok URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={downloadVideo}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isLoading ? 'Processing...' : 'Get Video'}
            </Button>
          </div>
          
          {url && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                Platform: {platform}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {videoData && (
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {(videoData.thumbnail || videoData.cover) && (
                <div className="space-y-4">
                  <img
                    src={videoData.thumbnail || videoData.cover}
                    alt="Video thumbnail"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              )}
              
              <div className="space-y-4">
                {videoData.title && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Title</h3>
                    <p className="text-gray-700">{videoData.title}</p>
                  </div>
                )}
                
                {(videoData.author || videoData.author?.nickname) && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Author</h3>
                    <p className="text-gray-700">{videoData.author?.nickname || videoData.author}</p>
                  </div>
                )}
                
                {videoData.duration && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Duration</h3>
                    <p className="text-gray-700">{videoData.duration}</p>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 pt-4">
                  {/* Instagram download */}
                  {videoData.download_url && (
                    <Button
                      onClick={() => handleDownload(videoData.download_url!)}
                      className="bg-green-600 hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Video
                    </Button>
                  )}
                  
                  {/* TikTok downloads */}
                  {videoData.hdplay && (
                    <Button
                      onClick={() => handleDownload(videoData.hdplay!, 'tiktok-hd.mp4')}
                      className="bg-green-600 hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download HD
                    </Button>
                  )}
                  
                  {videoData.play && (
                    <Button
                      onClick={() => handleDownload(videoData.play!, 'tiktok.mp4')}
                      className="bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Standard
                    </Button>
                  )}
                  
                  {videoData.wmplay && (
                    <Button
                      onClick={() => handleDownload(videoData.wmplay!, 'tiktok-watermark.mp4')}
                      variant="outline"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      With Watermark
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    onClick={() => window.open(url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Original
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideoDownloader;
