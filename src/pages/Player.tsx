import React, { useState, useCallback, useRef, useEffect } from "react";
import { Play, Pause, Download } from "@phosphor-icons/react"
import { useWavesurfer } from '@wavesurfer/react'
import Button from "../components/Button";

const track = {
        title: "Revelations",
        artists: "Acrobatik, Alka (BR)",
        mix: "Original Mix",
        tags: ["melodic techno", "released"],
        receiver: "Alka",
}

const formatPlayerTime = (seconds: number) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')

const Player: React.FC = () => {
        const playerRef = useRef(null)
        const [isPlaying, setIsPlaying] = useState(false);
        const { wavesurfer, isReady } = useWavesurfer({
                container: playerRef,
                height: 60,
                barGap: 2,
                barWidth: 3,
                waveColor: '#155E75',
                interact: true,
                autoScroll: true,
                progressColor: '#22D3EE',
                url: "src/assets/music/Revelations.wav",
        })

        useEffect(() => {
                if(wavesurfer){
                        const handleFinish = () => {
                                wavesurfer.stop()
                                setIsPlaying(false)
                        }
                        wavesurfer.on('finish', handleFinish)
                        return () => {
                                wavesurfer.un('finish', handleFinish)
                        }
                } 
        }, [wavesurfer])        

        const onPlayPause = useCallback(() => {
                setIsPlaying(!isPlaying)
                wavesurfer?.playPause()
        }, [wavesurfer, setIsPlaying, isPlaying])

        return (
        <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl md:text-3xl font-bold text-left md:w-xl lg:w-3xl">Hi {track.receiver}, hope you like it :)</h1>
                <div className=" bg-zinc-900 md:w-xl lg:w-3xl rounded-lg mt-4 p-6 flex gap-x-8">
                        <div className="w-48 h-48 relative flex items-center justify-center">   
                                <img 
                                        src="src/assets/img/artwork.png" 
                                        alt="Promo Album Cover" 
                                        className="absolute rounded-lg"
                                />
                                
                                <button 
                                        className="absolute w-20 h-20 bg-cyan-500 hover:bg-cyan-600 rounded-full cursor-pointer transition-colors flex justify-center items-center"
                                        onClick={() => onPlayPause()}
                                >
                                        {isPlaying ? 
                                                <Pause 
                                                        className=""
                                                        size={32}
                                                        weight="fill"
                                                />
                                                :
                                                <Play 
                                                       className=""
                                                        size={32}
                                                        weight="fill"
                                                        
                                                /> 
                                                }
                                </button>
                                
                        </div>
                        <div className="flex-1">
                                <div className="flex items-center justify-between">
                                        <div>
                                                <span className="text-lg font-semibold text-zinc-500">
                                                        {track.artists}
                                                </span>
                                                <h2 className="text-2xl text-zinc-100 font-bold mb-1">
                                                        {track.title + ' (' + track.mix + ')'}
                                                </h2>
                                                {track.tags.map((tag, index) => (
                                                <span key={index} className="mr-2 text-sm bg-cyan-800 text-zinc-200 px-2 rounded-full">
                                                        {tag}
                                                </span>
                                                ))}
                                        </div>
                                        <div>
                                        <Button
                                                onClick = {() => alert()}
                                        >
                                                <Download />
                                                <span>Download</span>
                                        </Button>
                                        </div>
                                </div>
                                <div className="mt-4">
                                        <div ref={playerRef} />
                                </div>
                                <div className="flex-1 text-right mt-1">
                                        <span className="text-sm text-zinc-300">
                                                {`${formatPlayerTime(wavesurfer?.getCurrentTime() ?? 0)} / ${formatPlayerTime(wavesurfer?.getDuration() ?? 0)}` }
                                        </span>
                                </div>
                        </div>
                </div>
                
        </div>
        );
        }

export default Player;