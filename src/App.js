import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [desc, setDesc] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then((tr) => setTransactions(tr));
  }, []);

  const getTransactions = async () => {
    const url = process.env.REACT_APP_API_URL + "transactions";
    const res = await fetch(url);
    return await res.json();
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    const url = process.env.REACT_APP_API_URL + "transaction";
    const price = name.split(" ")[0];
    const title = name.substring(price.length + 1);
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name: title, price, desc, datetime }),
    }).then((res) => {
      res.json().then((json) => {
        setName("");
        setDesc("");
        setDatetime("");
      });
    });
  };
  let balance = 0;
  for (const tr of transactions) {
    balance += tr.price;
  }
  balance = balance.toFixed(2);
  return (
    <main>
      <h1>
        ${balance.split(".")[0]}
        <span>.{balance.split(".")[1]}</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"+200 new zomato food"}
            required="true"
          />
          <input
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            type="datetime-local"
            required="true"
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder={"description"}
            required="true"
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((tr) => (
            <div className="transaction">
              <div className="left">
                <div className="name">{tr.name}</div>
                <div className="description">{tr.desc}</div>
              </div>
              <div className="right">
                <div className={"price " + (tr.price > 0 ? "green" : "red")}>
                  {tr.price > 0 ? "+" + tr.price : tr.price}
                </div>
                <div className="datetime">{tr.datetime}</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
