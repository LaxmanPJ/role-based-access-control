import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPermission = () => {
    const [permission, setPermission] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/auth/add_permission', { permission })
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/permission');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='p-3 rounded w-25 border'>
                <h2>Add Permission</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="permission"><strong>Permission:</strong></label>
                        <input 
                            type="text" 
                            name='permission' 
                            placeholder='Enter Permission'
                            onChange={(e) => setPermission(e.target.value)} 
                            className='form-control rounded-0' 
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Add Permission</button>
                </form>
            </div>
        </div>
    );
};

export default AddPermission;
