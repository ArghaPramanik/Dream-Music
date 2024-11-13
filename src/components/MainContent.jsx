import React from 'react';
import { Search } from 'lucide-react';
import { Droppable, Draggable } from '@hello-pangea/dnd';

export default function MainContent({ songs, currentSong, playSong }) {
  return (
    <div className="flex-1 bg-gradient-to-b from-[#400808] to-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-white hover:bg-white/10 rounded-md font-medium">Music</button>
          <button className="px-4 py-2 text-gray-400 font-medium hover:text-white hover:bg-white/10 rounded-md">Podcast</button>
          <button className="px-4 py-2 text-gray-400 font-medium hover:text-white hover:bg-white/10 rounded-md">Live</button>
          <button className="px-4 py-2 text-gray-400 font-medium hover:text-white hover:bg-white/10 rounded-md">Radio</button>
        </div>
        <div className="relative ">
          <input
            type="text"
            placeholder=" Search Songs"
            className="w-64 bg-[#2C1414] text-white placeholder-gray-400 px-10 py-2 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>

      {/* Artist Banner */}
      <div className="px-6 py-4">
        <div className="relative h-[240px] rounded-3xl overflow-hidden bg-gradient-to-r from-[#400808] to-black">
          <img
            src="/images/banner.png"
            alt="Red smoke background"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          
          <img
            src="/images/artist.png"
            alt="Michael Jackson performing"
            className="absolute -right-4 -bottom-4 h-[130%] w-auto object-contain object-right-bottom"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))'
            }}
          />

          <div className="relative h-full flex flex-col justify-end p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#0EA5E9] bg-opacity-20 backdrop-blur-sm text-[#0EA5E9] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0L9.96 3.28L13.76 3.72L10.88 6.48L11.68 10.24L8 8.32L4.32 10.24L5.12 6.48L2.24 3.72L6.04 3.28L8 0Z" />
                </svg>
                Verified Artist
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-white mb-2">Michael Jackson</h1>
            <p className="text-sm text-gray-300">27,852,501 monthly listeners</p>
          </div>
        </div>
      </div>

      {/* Popular Section */}
      <div className="px-4 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Popular</h2>
          <button className="text-gray-400 hover:text-white font-medium ">See All</button>
        </div>

        {/* Song List */}
        <div className="grid grid-cols-[40px_2fr_1fr_80px_2fr] gap-2 text-xs text-gray-400 border-b border-white/10 pb-2 px-4 font-medium">
          <div>#</div>
          <div>TITLE</div>
          <div className="text-right font-medium">PLAYING</div>
          <div className="text-right font-medium">TIME</div>
          <div className='text-right font-medium'>ALBUM</div>
        </div>

        <div className="flex-grow overflow-y-auto">
          <Droppable droppableId="songList">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {songs.map((song, index) => (
                  <Draggable key={song.id} draggableId={song.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`grid grid-cols-[40px_2fr_1fr_80px_2fr] gap-2 px-4 py-2 items-center group text-sm ${
                          currentSong?.id === song.id 
                            ? 'bg-[#800000]' 
                            : 'hover:bg-white/5'
                        }`}
                        onClick={() => playSong(song)}
                      >
                        <div className="text-gray-400">{index + 1}</div>
                        <div className="flex items-center gap-2 overflow-hidden">
                          <img 
                            src={song.coverSrc} 
                            alt={song.title} 
                            className="w-10 h-10 rounded flex-shrink-0"
                          />
                          <span className={`truncate ${currentSong?.id === song.id ? 'text-white' : ''}`}>
                            {song.title}
                          </span>
                        </div>
                        <div className="text-right text-gray-400 truncate">
                          {song.playCount.toLocaleString()}
                        </div>
                        <div className="text-right text-gray-400 ">{song.duration}</div>
                        <div className="text-right text-gray-400 truncate">{song.album}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </div>
  );
}