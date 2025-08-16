import './Variables.css'
import './main.css'
import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import AddPerson from './AddPerson';
import LogPeople from './LogPeople';
import ListOfPeople from './ListOfPeople';
import Transactions from './transactions';

function Root() {
    const [people, setPeople] = useState({});
    const [transactions, setTransactions] = useState({});

    return (
        <StrictMode>
            <div className='main'>
                <div className='add_new_container'>
                    <h1 className='title'>Group Debt Solver</h1>
                    <div className='add_new'>
                        <AddPerson people={people} setPeople={setPeople} />
                        <LogPeople people={people} transactions={transactions} />
                    </div>

                </div>

                <div className='content_block'>
                    <Transactions transactions={transactions} setTransactions={setTransactions} people={people} setPeople={setPeople}/>
                </div>

                <div className='content_block'>
                    <ListOfPeople people={people} setPeople={setPeople} />
                </div>

            </div>
        </StrictMode>
    );
}

createRoot(document.getElementById('root')).render(<Root />);
