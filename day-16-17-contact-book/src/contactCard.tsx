import { useState } from "react";

interface Contact {
  id: string;
  name: string;
  city?: string;
}

interface ContactCardProps {
    id: string;
    city?: string;
    name: string;
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
    activeId: string;
    setActiveId: React.Dispatch<React.SetStateAction<string>>
}

export default function ContactCard({ id, city, name, setContacts, activeId, setActiveId }: ContactCardProps) {


    const [newName, setNewName] = useState('name')
    const [newCity, setNewCity] = useState('city')


    const deleteContact = () => {
        setContacts(prev => prev.filter(contact => contact.id !== id))
    }


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
        setActiveId('')
    }


    return (
        <div 
            key={id} 
            className="contact-card" 
        >
            { !(activeId === id) ? (
                <div className="card-content">
                    <p className="card-content--name">{ name }</p>
                    <p>{ city }</p>
                    <button className="card-button" onClick={() => setActiveId(id)}>Edit</button>
                </div>

            ) : (
                <form className="card-content" onSubmit={(e) => updateContact(e)}>
                    <input
                        name="mewname"
                        type="text"
                        placeholder="Type name"
                        defaultValue={name}
                        onChange={(e) => setNewName(e.target.value)}
                    />

                    <input
                        name="newcity"
                        type="text"
                        placeholder="Type city"
                        defaultValue={city}
                        onChange={(e) => setNewCity(e.target.value)}
                    />

                    <div className="card-buttons">
                        <button className="card-button">Confirm</button>
                        <button className="card-button" type="button" onClick={() => setActiveId('')}>Cancel</button>
                        <button className="card-button" type="button" onClick={deleteContact}>Delete</button>
                    </div>

                </form>
            )}

        </div>
    )

}