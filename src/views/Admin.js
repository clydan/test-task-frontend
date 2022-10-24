
import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Settings from '../components/Settings';
import useFetch from '../useFetch';

const Admin = () => {

    const { data, isLoading, error } = useFetch('http://localhost:5000/settings');
    const [allTables, setAllTables] = useState(null);
    const [tableName, setTableName] = useState('');
    const [message, setMessage] = useState('');

    const [tableCount, setTableCount] = useState(Number)
    const [chairCount, setChairCount] = useState(Number)
    const [maxNumberChairs, setMaxNumberChair] = useState(Number)

   
    
    useEffect(() => {
        fetch('http://localhost:5000/tables')
        .then(res => {
            if (!res.ok) {
                throw Error('Could not connect to server');
            }
            return res.json();
        })
        .then(data => {
            setAllTables(data.tables);
            // setIsLoading(false);
            // setError(null);
        })
        .catch(err => {
            console.log(err.message)
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const table = { name: tableName };

        fetch('http://localhost:5000/tables', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(table)
        }).then((res) => res.json())
            .then(data => {
                setMessage(data.message);
            })
            .catch(err => {
                setMessage(err.message);
            });
    }

    const handleSettingEdit = (e) => {
        e.preventDefault();

        const setting = {
            table_count: tableCount,
            chair_count: chairCount,
            max_number_on_table: maxNumberChairs
        }

        console.log(setting);

        fetch('http://localhost:5000/settings', {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(setting)
        }).then((res) => res.json())
            .then(data => {
                setMessage(data.message);
            })
            .catch(err => {
                setMessage(err.message);
            });

    }

    const handleReset = () => {
        fetch('http://localhost:5000/admin/reset', {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not connect to server');
                }
                return res.json();
            }).then(data => {
                console.log(data)
            })
    }

    const showDialogForm = () => {
        const dialogForm = document.querySelector('#form-dialog');

        dialogForm.show();
    }

    const closeDialogForm = () => {
        const dialogForm = document.querySelector('#form-dialog');

        dialogForm.close();
    }


    return (
        <div className="admin">
            <dialog id='form-dialog'>
                <form onSubmit={handleSettingEdit}>

                    <div className='input'>
                    <label htmlFor="">Total tables</label>
                    <input
                        value={tableCount}
                        onChange={(e) => setTableCount(e.target.value)}
                        required
                        type="text"
                    />
                    </div>

                    <div className='input'>
                    <label htmlFor="">Total chairs</label>
                    <input
                        value={chairCount}
                        onChange={(e) => setChairCount(e.target.value)}
                        required
                        type="text"
                    />
                    </div>


                    <div className='input'>
                    <label htmlFor="">Max chairs at tables</label>
                    <input
                        value={maxNumberChairs}
                        onChange={(e) => setMaxNumberChair(e.target.value)}
                        required
                        type="text"
                    />
                    </div>


                    <button>Save Setting</button>
                </form>

                <button onClick={closeDialogForm}>Close</button>
            </dialog>
            <div className="back">
                <Link to="/">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-corner-down-left"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>
                    </span>
                    back
                </Link>
            </div>
            <div className="left">
                <div className="title">
                    System Settings
                </div>

                <div className="subtitle">
                    Below is the main system setting
                    {error && <div>{error}</div>}
                    {isLoading && <div>Loading <span>⏳</span></div>}
                    {data && <Settings settings={data} />}
                </div>

                <div className="buttons">
                    <button onClick={handleReset} className='reset'>Reset Settings</button>
                    <button onClick={showDialogForm} className='edit'>Edit Settings</button>
                </div>

            </div>


            <div className="right">
                <div className="title">
                    Create a table
                </div>

                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <input
                            value={tableName}
                            onChange={(e) => setTableName(e.target.value)}
                            type="text"
                            required
                            placeholder='Enter table name' />
                        <button>Create table  </button>
                        {message && <div>{message}</div>}
                    </form>
                </div>
            </div>

            {allTables && <div className="tables">

                <div className="available">
                    <div className="title">Available Tables</div>
                    <ul>
                        {allTables.filter((table) => !table.is_occupied).map(table => (<li key={table.id}>{table.name}</li>))}
                    </ul>
                </div>
                <div className="available">
                    <div className="title">Unavailable Tables</div>
                    <ul>
                        {allTables.filter((table) => table.is_occupied).map(table => (<li key={table.id}>{table.name}</li>))}
                    </ul>
                </div>
            </div>}
        </div>
    );
}

export default Admin;