import './MemoryGame.css'
import { useMemo, useState } from 'react'
import { Flower2 } from 'lucide-react'
import shuffle from 'lodash/shuffle'

interface MemoryGameProps {
    images: string[],
    setGameWon: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MemoryGame({ images, setGameWon }: MemoryGameProps) {

    const doubledImages = useMemo(() => {
        return shuffle([...images, ...images]);
    }, [images]);

    const [activeItem, setActiveItem] = useState<{ index: number; src: string } | null>(null);
    const [matches, setMatches] = useState(new Set())

 
    const handleClick = (index: number, image: string) => {
        if (image === activeItem?.src && index !== activeItem.index) {
            let matchesSet = new Set(matches)
            matchesSet.add(activeItem.src)

            if (matchesSet.size >= 6) {
                setGameWon(true)
            }
            setMatches(matchesSet)
        }

        setActiveItem({ index: index, src: image })
    }

    return(

        <div className="memory-game">
            
            { doubledImages.map((image, i) => {
                const isFlipped = i === activeItem?.index || matches.has(image)
                
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
    )
}