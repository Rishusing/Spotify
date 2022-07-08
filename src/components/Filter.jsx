import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Filter = (props) => {

    const [country, setCountry] = useState([]);
    const [flag, setFlag] = useState(false);
    // const [name, setName] = useState({});

    useEffect(() => {

        axios.get('http://www.mocky.io/v2/5a25fade2e0000213aa90776').then((res) => {

            const countries = res.data.filters[1].values;
            const newCountry = [];

            for (let i = 0; i < countries.length; i++){
                const obj = {
                    value: countries[i].value,
                    label: countries[i].name
                }
                newCountry.push(obj);
            }
            setCountry(newCountry)
            setFlag(true)
        }).catch(() => {
            toast.error( "Network issue", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }, [])

    return (
        <div>
            <Select className='select' placeholder="Default country is India" onChange={(e) => { props.onChange(e)}} options={country} />
        </div>
    )
}

export default Filter