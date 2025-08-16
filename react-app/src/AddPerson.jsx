import './AddPerson.css'
import React, { useState } from 'react';

function AddPerson({ people, setPeople }) {
    const [newName, setNewName] = useState('');

    function add() {
        const trimmed = newName.trim();
        if (trimmed === '' || people[trimmed]) return;
        setPeople(prev => ({ ...prev, [trimmed]: { Owes: 0, Owed: 0 } }));
        setNewName('');
    }

    return (
        <div>
            <input
                type="text"
                id="AddNewPerson"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') add();
                }}
                placeholder="Add new person"
            />
            <button className='add' onClick={add}>Add</button>
        </div>
    );
}

export default AddPerson;