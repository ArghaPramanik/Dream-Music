import React, { useState, useEffect, useRef } from 'react'
import { Howl } from 'howler'
import { DragDropContext } from '@hello-pangea/dnd'
import LeftSidebar from './LeftSidebar'
import MainContent from './MainContent'
import RightSidebar from './RightSidebar'
import { initialSongs } from '../data/songs'
import { formatTime } from '@/utlis/formatTime'

export default function MusicPlayer() {
  const [songs, setSongs] = useState(initialSongs)
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const howlerRef = useRef(null)

  useEffect(() => {
    if (currentSong) {
      howlerRef.current = new Howl({
        src: [currentSong.audioSrc],
        html5: true,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onend: () => {
          setIsPlaying(false)
          setProgress(0)
        },
        onseek: () => {
          setProgress((howlerRef.current.seek() / howlerRef.current.duration()) * 100)
        },
      })

      howlerRef.current.play()
    }

    return () => {
      if (howlerRef.current) {
        howlerRef.current.unload()
      }
    }
  }, [currentSong])

  useEffect(() => {
    const updateProgress = () => {
      if (howlerRef.current && isPlaying) {
        const seek = howlerRef.current.seek()
        const duration = howlerRef.current.duration()
        setProgress((seek / duration) * 100)
      }
    }

    const progressInterval = setInterval(updateProgress, 1000)
    return () => clearInterval(progressInterval)
  }, [isPlaying])

  const playSong = (song) => {
    if (currentSong?.id === song.id) {
      if (isPlaying) {
        howlerRef.current.pause()
        setIsPlaying(false)
      } else {
        howlerRef.current.play()
        setIsPlaying(true)
      }
    } else {
      setCurrentSong(song)
      if (howlerRef.current) {
        howlerRef.current.unload()
      }
      const newHowl = new Howl({
        src: [song.audioSrc],
        html5: true,
        autoplay: true,
      })
      howlerRef.current = newHowl
      setIsPlaying(true)
    }
  }

  const onDragEnd = (result) => {
    if (!result.destination) return
    
    const { source, destination } = result

    if (destination.droppableId === 'nowPlaying') {
      const draggedSong = songs[source.index]
      setCurrentSong(draggedSong)
      playSong(draggedSong)
      return
    }

    const items = Array.from(songs)
    const [reorderedItem] = items.splice(source.index, 1)
    items.splice(destination.index, 0, reorderedItem)
    setSongs(items)
  }

  return (
    <div className="flex h-screen bg-black text-white">
      <LeftSidebar />
      <DragDropContext onDragEnd={onDragEnd}>
        <MainContent
          songs={songs}
          currentSong={currentSong}
          playSong={playSong}
        />
        <RightSidebar
          currentSong={currentSong}
          isPlaying={isPlaying}
          progress={progress}
          howlerRef={howlerRef}
          formatTime={formatTime}
        />
      </DragDropContext>
    </div>
  )
}