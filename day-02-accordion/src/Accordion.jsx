import './Accordion.css'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'


export default function Accordion({ items }) {

    const [activeItems, setActiveItems] = useState(new Set())

    useEffect(() => {
        console.log('activeItems:', activeItems)
    }, [activeItems])


    const handleClick = (i) => {
        const indexSet = new Set(activeItems)

        if (indexSet.has(i)) {
            indexSet.delete(i)
        }
        else {
            indexSet.add(i)
        }

        setActiveItems(indexSet)
    }

    
    return (
        <div className="accordion">
            { items.length > 0 && items.map((item, i) => (
                <div className="accordion--item">
                    <div className="accordion--heading" onClick={() => handleClick(i)}>
                        <p>{item.title}</p>

                        { !activeItems.has(i) ? (
                            <ChevronDown className="accordion--plus-icon"/>
                        ) : (
                            <ChevronUp className="accordion--plus-icon"/>
                        )}
                    </div>
                    <p className={`accordion--content ${activeItems.has(i) ? 'active' : ''}`}>{item.content}</p>
                    <div className={`accordion--underline ${activeItems.has(i) ? 'active' : ''}`}/>
                </div>
            ))}
        </div>
    )
}