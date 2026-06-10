import { useState } from "react";

interface Contact {
  id: string;
  name: string;
  city: string;
}

interface ContactCardProps {
    id: string;
    city: string;
    name: string;
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

export default function ContactCard({ id, city, name, setContacts }: ContactCardProps) {

    const [isFlipped, setIsFlipped] = useState(false)
    const [newName, setNewName] = useState('')
    const [newCity, setNewCity] = useState('')

    const updateContact = (e:React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        // take the previous array of objects
        setContacts(prev => {
            // map the previous array
            const filtered = prev.map(contact => {
                let updatedName = newName.trim() ? newName.trim() : contact.name
                let updatedCity = newCity.trim() ? newCity.trim() : contact.city

                // return updated contact
                const updated = contact.id === id
                    ? {...contact, name: updatedName, city: updatedCity}
                    : contact
                return updated
            })
            return filtered
        })
        setIsFlipped(false)
    }

    return (
        <div 
            key={id} 
            className="contact-card" 
        >
            { !isFlipped ? (
                <div className="card-content">
                    <p className="card-content--name">{ name }</p>
                    <p>{ city }</p>
                    <button className="card-button" onClick={() => setIsFlipped(prev => !prev)}>Edit</button>
                </div>

            ) : (
                <form className="card-content" onSubmit={(e) => updateContact(e)}>
                    <input
                        name="mewname"
                        type="text"
                        placeholder="Type name"
                        onChange={(e) => setNewName(e.target.value)}
                    />

                    <input
                        name="newcity"
                        type="text"
                        placeholder="Type city"
                        onChange={(e) => setNewCity(e.target.value)}
                    />

                    <div className="card-buttons">
                        <button className="card-button">Confirm</button>
                        <button className="card-button" type="button" onClick={() => setIsFlipped(false)}>Cancel</button>
                    </div>

                </form>
            )}

        </div>
    )

}