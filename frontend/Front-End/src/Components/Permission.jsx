import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Permission = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/auth/permission')
      .then(result => {
        if (result.data.Status) {
          setPermissions(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.log(err));
  }, []);

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Permissions</h3>
      </div>
      <Link to="/dashboard/add_permission" className="btn btn-success">Add Permission</Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {
              permissions.map(permission => (
                <tr key={permission.id}>
                  <td>{permission.name}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Permission;
