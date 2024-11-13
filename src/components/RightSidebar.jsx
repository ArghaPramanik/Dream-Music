import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react';
import { formatTime } from '@/utlis/formatTime';

export default function RightSidebar({ currentSong, isPlaying, progress, playSong, playNextSong, playPreviousSong, howlerRef }) {
  return (
    <div className="w-80 bg-gradient-to-b from-[#400808] to-black p-6 flex flex-col">
      <div className="flex-grow">
        {/* You can add other content here if needed */}
      </div>

      {/* Now Playing Section */}
      <Droppable droppableId="nowPlaying">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {currentSong && (
              <div className="bg-[#800000] rounded-lg overflow-hidden mt-auto">
                <div className="p-4">
                  <div className="text-center mb-2">
                    <div className="text-sm font-medium">Now Playing</div>
                  </div>

                  <div className="aspect-video w-full mb-4">
                    <img
                      src={currentSong.coverSrc}
                      alt={currentSong.title}
                      className="w-full h-full rounded object-fill"
                    />
                  </div>

                  <div className="text-center mb-4 ">
                    <h3 className="text-lg font-bold">{currentSong.title}</h3>
                    <p className="text-sm text-gray-300">{currentSong.artist}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="relative h-1 bg-black/30 rounded-full">
                      <div
                        className="absolute top-0 left-0 h-full bg-white rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-xs text-gray-300">
                      <span>{formatTime(howlerRef.current?.seek() || 0)}</span>
                      <span>{currentSong.duration}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <button className="text-white/80 hover:text-white transition-colors">
                      <Repeat className="h-5 w-5" />
                    </button>
                    <button onClick={playPreviousSong} className="text-white/80 hover:text-white transition-colors">
                      <SkipBack className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => isPlaying ? howlerRef.current?.pause() : howlerRef.current?.play()}
                      className="bg-white text-[#800000] rounded-full p-2 hover:bg-gray-100 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" />
                      )}
                    </button>
                    <button onClick={playNextSong} className="text-white/80 hover:text-white transition-colors">
                      <SkipForward className="h-5 w-5" />
                    </button>
                    <button className="text-white/80 hover:text-white transition-colors">
                      <Shuffle className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}