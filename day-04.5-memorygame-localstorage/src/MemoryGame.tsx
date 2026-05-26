import './MemoryGame.css'
import { useEffect, useMemo, useState } from 'react'
import { Flower2 } from 'lucide-react'
import shuffle from 'lodash/shuffle'
import useLocalStorage from './LocalStorage'

interface MemoryGameProps {
    images: string[],

}

export default function MemoryGame({ images }: MemoryGameProps) {

    const doubledImages = useMemo(() => {
        return shuffle([...images, ...images]);
    }, [images]);

    // const doubledImages = [...images, ...images]

    const [activeItem, setActiveItem] = useState<{ index: number; src: string } | null>(null)
    const [matches, setMatches] = useLocalStorage<string[]>("matches", []);
    const [gameWon, setGameWon] = useState<boolean>(false)
    
    const handleRestart = () => {
        setMatches([])
        setActiveItem(null)
        setGameWon(false)
    }
 
    const handleClick = (index: number, image: string) => {

        if (image === activeItem?.src && index !== activeItem.index) {
            if (matches.length + 1 >= 6) setGameWon(true)
            setMatches([...matches, image])
        }

        setActiveItem({ index: index, src: image })
    }

    return(

        <>
        { gameWon && (
            <>
                <h1>You won!</h1>
                <button onClick={handleRestart}>Play again?</button>
            </>
        )}

        <div className="memory-game">
            { doubledImages.map((image, i) => {
                const isFlipped = i === activeItem?.index || matches?.includes(image)
                
                return (
                    <div key={i} className={`memory-game--card ${isFlipped ? 'flipped' : ''}`} onClick={() => handleClick(i, image)}>
                        <div className="back">
                            <Flower2 size={30} color="black" />
                        </div>
                        <img src={image} key={i} alt="game piece" className='front'/>
                    </div>
                )
            })}
        </div>
        </>
    )
}