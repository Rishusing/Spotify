import React, { useEffect, useState } from 'react'
import Select from 'react-select'

import 'react-toastify/dist/ReactToastify.css';

const Filter = (props) => {

    const [country, setCountry] = useState([]);

    useEffect(() => {

        fetch('https://www.mocky.io/v2/5a25fade2e0000213aa90776')
            .then((res) => res.json())
            .then((data) => {
                
                const countries = data.filters[1].values;
                const newCountry = [];

                for (let i = 0; i < countries.length; i++){
                    const obj = {
                        "value": countries[i].value,
                        "label": countries[i].name
                    }
                    newCountry.push(obj);
                }
                setCountry(newCountry)
            });

    }, [])

    return (
        <div>
            <Select className='select' placeholder="Default country is India" onChange={(e) => { props.onChange(e)}} options={country} />
        </div>
    )
}

export default Filter