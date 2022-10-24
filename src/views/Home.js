
import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {


    const [headCount, setHeadCount] = useState(0);
    const [message, setMessage] = useState('');
    const [allocatedTables, setAllocatedTables] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const customers = {number_of_customers: headCount}
        console.log(customers);

        fetch('http://localhost:5000/customers', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customers)
        })
        .then((res => res.json()))
        .then(data => {
            setAllocatedTables(data.availableTables);
            console.log(data.availableTables);
        })
        .catch(err => {
            setMessage(err.message);
        });
    }


    return ( 
        <div className="home">
            <div className="leading">
                <div className="title">
                    Royal Taste
                </div>

                <div className="link">
                    <Link to="/admin">Administrator</Link>
                </div>
            </div>

            <div className="main-customer">
               <div className="welcome-message">
                    Hello and welcome to Royal Taste . Before we take your order, we would love to know number of people we will be serving
               </div>

               <div className="form">
                    <form onSubmit={handleSubmit}>
                        <input
                        value={headCount}
                        onChange={(e) => setHeadCount(e.target.value)}
                        type="text"
                        required
                         placeholder="How many people are we serving"
                         ></input>
                        <button>Submit </button>
                    </form>
               </div>

               {allocatedTables && <div className="message">
                    {allocatedTables.map((table) => (
                        <div key={table._id}>you have been assigned table <strong>{table._id}</strong></div>
                    ))}
               </div>}
            </div>
        </div>
     );
}
 
export default Home;