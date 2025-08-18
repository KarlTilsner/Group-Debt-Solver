function getBalancesFromPeople(people) {
    const balances = {};
    Object.entries(people).forEach(([name, info]) => {
        balances[name] = (info.Owed || 0) - (info.Owes || 0);
    });
    return balances;
}

function minimizeTransactionsFromPeople(people) {
    if (!people || Object.keys(people).length === 0) return [];

    const balances = getBalancesFromPeople(people);

    const peopleArr = Object.entries(balances).map(([name, balance]) => ({
        name,
        balance
    }));

    const transactions = [];

    function getMaxCreditor() {
        return peopleArr.reduce(
            (maxIdx, p, i, arr) => arr[i].balance > arr[maxIdx].balance ? i : maxIdx, 
            0
        );
    }

    function getMaxDebtor() {
        return peopleArr.reduce(
            (minIdx, p, i, arr) => arr[i].balance < arr[minIdx].balance ? i : minIdx, 
            0
        );
    }

    while (true) {
        const maxCreditor = getMaxCreditor();
        const maxDebtor = getMaxDebtor();

        const credit = peopleArr[maxCreditor].balance;
        const debit = peopleArr[maxDebtor].balance;

        if (credit === 0 && debit === 0) break;

        const amount = Math.min(credit, -debit);

        peopleArr[maxCreditor].balance -= amount;
        peopleArr[maxDebtor].balance += amount;

        transactions.push({
            from: peopleArr[maxDebtor].name,
            to: peopleArr[maxCreditor].name,
            amount
        });
    }

    return transactions;
}


function DebtSolution({ people }) {
    const settlements = minimizeTransactionsFromPeople(people);

    return (
        <div>
            <h2>Settlement Plan</h2>
            {settlements.length === 0 ? (
                <p>No settlements needed</p>
            ) : (
                <ul>
                    {settlements.map((t, i) => (
                        <li key={i}>
                            {t.from} pays {t.to} ${t.amount}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}


export default DebtSolution