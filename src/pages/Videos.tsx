import { useState } from "react";
import { videos } from "@/data/videos";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Videos = () => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  return (
    <div className="bg-amber-50">
      <div className="container mx-auto py-16 md:py-24 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-900">Cooking Videos</h1>
          <p className="text-stone-600 mt-2">Watch, learn, and cook along with Shahana.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Card 
              key={video.id} 
              className="overflow-hidden cursor-pointer group"
              onClick={() => setSelectedVideoId(video.videoId)}
            >
              <CardHeader className="p-0 relative">
                <img src={video.thumbnail} alt={video.title} className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
                  <PlayCircle className="h-16 w-16 text-white" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-red-900 mb-2">{video.title}</h3>
                <p className="text-stone-600">{video.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedVideoId} onOpenChange={(isOpen) => !isOpen && setSelectedVideoId(null)}>
        <DialogContent className="max-w-3xl p-0">
          <DialogHeader className="p-4">
            <DialogTitle>Video Player</DialogTitle>
          </DialogHeader>
          {selectedVideoId && (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Videos;