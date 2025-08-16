import './Transactions.css'
import React, { useState, useEffect } from 'react';

function Transactions({ transactions, setTransactions, people, setPeople }) {
    const [newAmount, setNewAmount] = useState(0);
    const [selectedPerson, setSelectedPerson] = useState('');
    const [transactionNumber, setTransactionNumber] = useState(0);
    const [peopleSharing, setPeopleSharing] = useState([]);



    useEffect(() => {
        updateOwed();
    }, [transactions]);



    function HandleTransactions(payer) {
        const PeopleAdded = Object.keys(people).length;
        if (PeopleAdded < 2) {
            alert(`Add ${2 - PeopleAdded} More People First!`);
        } 
        else if (payer == "0" || payer == '') {
            alert("Select A Payer");
        }
        else {
            if (newAmount > 0) {
                setTransactions((prev) => ({
                    ...prev,
                    [transactionNumber]: {
                        ...prev[transactionNumber],
                        Payer: prev[transactionNumber]?.Payer || {Name: payer, Amount: newAmount},
                        PeopleSharing: prev[transactionNumber]?.PeopleSharing || peopleSharing,
                    },
                }));

                setTransactionNumber(prev => prev += 1);
            }
            
            setNewAmount(0);
            setPeopleSharing([])
        }
    }



    function updateOwed() {
        // Reset owed and owes to 0 to avoid accidental adding
        let updatedPeople = {};
        Object.keys(people).forEach((name) => {
            updatedPeople[name] = { Owed: 0, Owes: 0 };
        });

        Object.entries(transactions).forEach(([transactionNum, transaction]) => {
            const PAYMENT = transaction.Payer.Amount;
            const PAYMENTSPLIT = PAYMENT / (transaction.PeopleSharing.length + 1);
            const PAYER = transaction.Payer.Name;

            // Add the total owed to the payer
            updatedPeople[PAYER].Owed += (PAYMENT - PAYMENTSPLIT);

            // Add the total the people sharing owe
            transaction.PeopleSharing.forEach((name) => {
                updatedPeople[name].Owes += PAYMENTSPLIT;
            });
        })

        setPeople(updatedPeople);
    }



    function addRemoveSharing(name) {
        setPeopleSharing((prev) =>
            prev.includes(name)
                ? prev.filter((n) => n !== name)
                : [...prev, name]
        );
    }




    function removeTransaction(number)  {
        setTransactions(prev => {
            const updated = { ...prev };
            delete updated[number];
            return updated;
        });
    }



    return (
        <div>
            <h2>Add Transactions</h2>
            <div className='transactionAdderContainer'>
                <div className='transactionAdder'>

                    <select name="PayerName" id="PayerDropdown" value={selectedPerson} onChange={(e) => {setSelectedPerson(e.target.value); setPeopleSharing([])}}>
                        <option value="0">-- Select Payer --</option>

                        {Object.keys(people).map((person) => (
                            <option key={person} value={person}>{person}</option>
                        ))}
                    </select>

                    <input type="number" id="PayerAmount" value={newAmount} onChange={(e) => setNewAmount(Number(e.target.value))}/>

                    <div>
                        <button className='add' onClick={() => HandleTransactions(selectedPerson)}>Add Transaction</button>
                    </div>
                </div>

                <div className='peopleSharingContainer'>
                    <h3>Select Who is Sharing</h3>
                    <div className='peopleSharingButtons'>
                        {Object.entries(people).filter(([name]) => name !== selectedPerson).map(([name]) => (
                            <button 
                                key={name} 
                                onClick={() => addRemoveSharing(name)} 
                                className={peopleSharing.includes(name) ? "active-btn" : ""}
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <ul>
                    <li className='transactionListItem GridHeading'>
                        <h3>Payer</h3>
                        <h3 className='listedTransactionSharing'>Sharing</h3>
                        <div></div>
                    </li>

                    {Object.entries(transactions).map(([number, info]) => (
                        <li key={number} className='transactionListItem'>
                            <div key={info.Payer.Name}>{info.Payer.Name} (${info.Payer.Amount})</div>
                            <div className='listedTransactionSharing'>{info.PeopleSharing.map(e => <div key={e}>{e}</div>)}</div>
                            <button className='remove' onClick={() => removeTransaction(number)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
            
        </div>
    );
}

export default Transactions;