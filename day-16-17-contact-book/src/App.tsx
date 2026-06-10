import { useState, useEffect } from 'react'
import './App.css'
import ContactCard from './contactCard'

interface Contact {
  id: string;
  name: string;
  city: string;
}

const dummyData: Contact[] = 
[
    { "id": "1", "name": "Alice Johnson", "city": "New York" },
    { "id": "2", "name": "Bob Smith", "city": "Los Angeles" },
    { "id": "3", "name": "Charlie Brown", "city": "Chicago" },
    { "id": "4", "name": "David Williams", "city": "Houston" },
    { "id": "5", "name": "Emma Davis", "city": "Phoenix" },
    { "id": "6", "name": "Frank Miller", "city": "Philadelphia" },
    { "id": "7", "name": "Grace Wilson", "city": "San Antonio" },
    { "id": "8", "name": "Henry Moore", "city": "San Diego" },
    { "id": "9", "name": "Isabella Garcia", "city": "Dallas" },
    { "id": "10", "name": "Jack Martinez", "city": "San Jose" }
]

function App() {

  const [contacts, setContacts] = useState<Contact[]>(dummyData)

  useEffect(() => {
    console.log('contacts:', contacts)
  }, [contacts])

  return (
    <div className="app">
      <h3>Contact Book</h3>
      <button 
        className="app--add-new"
        >
          Add new
        </button>
      <div className="contactbook">
        { contacts.map(contact => (
          <ContactCard
            key={contact.id}
            id={contact.id}
            name={contact.name}
            city={contact.city}
            setContacts={setContacts}
          />

        ))}

      </div>
    </div>
  )
}

export default App
