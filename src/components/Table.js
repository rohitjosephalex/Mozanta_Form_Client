import React, { useEffect, useState } from "react";
import axios from "axios";


const Table = () => {

    const [users, setUser] = useState([]);
    const [err, setErr] = useState();
    function compareName(a, b) {
        // console.log("@@###compare")

        // converting to uppercase to have case-insensitive comparison
        const name1 = a.name.toUpperCase();
        const name2 = b.name.toUpperCase();
    
        let comparison = 0;
    
        if (name1 > name2) {
            comparison = 1;
        } else if (name1 < name2) {
            comparison = -1;
        }
        return comparison;
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        axios.get('http://localhost:8080/api/forms', { signal: signal })
            .then(response => {
                console.log(response)
                setUser(response.data.sort(compareName));
                
            })
            .catch(err => {
                // handle errors in jsx
                setErr(err.data);
            });
        return () => {
            controller.abort();
        };
    }, []);

    console.log(users);


    return (
        <>
            <div className="components">
                <h1>Students information</h1>
                <table>
                    <thead>
                        <tr>
                            <th className="remove-padding-top fw-500">Name</th>
                            <th className="remove-padding-top fw-500">Date of Birth</th>
                            <th className="remove-padding-top fw-500">Class</th>
                            <th className="remove-padding-top fw-500">Division</th>
                            <th className="remove-padding-top fw-500">Gender</th>
                            <th className="remove-padding-top fw-500">Admission No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {err ? <p>Please reload the page</p> : null}
                        {users.length > 0 ? users.map((data, i) => {
                            return (
                                <tr key={i}>
                                    
                                    <td>{data.name}</td>
                                    <td>{data.dob}</td>
                                    <td>{data.className}</td>
                                    <td>{data.division}</td>
                                    <td>{data.gender}</td>
                                    <td>{data.admNo}</td>
                                </tr>
                            );
                        }) : null}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;