function LogPeople({ people, transactions }) {
    function Display() {
        console.log("Transactions", transactions)
        console.log("People", people)
    }

    return (
        <div>
            <button onClick={() => Display()}>Console</button>
        </div>
    );
}

export default LogPeople;
