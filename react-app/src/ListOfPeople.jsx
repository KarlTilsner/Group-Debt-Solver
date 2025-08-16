import './ListOfPeople.css'

function ListOfPeople({ people, setPeople }) {
    function removePerson(name) {
        setPeople(prev => {
            const updated = { ...prev };
            delete updated[name];
            return updated;
        });
    }



    return (
        <div>
            <h2>Owing</h2>
            <ul>
                <li className='personListItem GridHeading'>
                    <h3>Person</h3>
                    <h3 className='listedTransactionSharing'>Owed</h3>
                    <h3 className='listedTransactionSharing'>Owes</h3>
                    <div></div>
                </li>

                {Object.entries(people).map(([name, info]) => (
                    <li key={name} className='personListItem'>
                        <div>{name}</div>
                        <div>${info.Owed}</div>
                        <div>${info.Owes}</div>
                        <button className='remove' onClick={() => removePerson(name)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListOfPeople;
