import { useEffect, useState } from "react";
import { deleteAccountById, fetchAllUsers } from "../services/userServices";
import "../css/users.css";
import { jwtDecode } from "jwt-decode";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteAccountQuestion, setDeleteAccountQuestion] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null)

  const fetchUsers = async () => {
    try {
      const response = await fetchAllUsers();
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    const filteredUsers = response.filter(user => user._id !== decodedToken.userId);
      setUsers(filteredUsers);
    } catch (error) {
      setError(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    setLoadingDelete(true);
    try {
        await deleteAccountById(id);
        fetchUsers();
        // setUsers(users.filter(user => user.id !== id));
    } catch (error) {
        setError(error.response?.data || error.message);
    } finally {
        setLoadingDelete(false);
        setDeleteAccountQuestion(false);
    }
  }

  useEffect(() => {
    if (deleteAccountQuestion) {
      setTimeout(() => {
        setDeleteAccountQuestion(false);
      }, 4000);
      setTimeout(() => {
        document.querySelector('.delete-timer-number').innerText = ' 2 ';
        document.querySelector('.delete-timer-number').style.backgroundColor = '#007bffae';
      }, 1000);
        setTimeout(() => {
            document.querySelector('.delete-timer-number').innerText = ' 1 ';
        document.querySelector('.delete-timer-number').style.backgroundColor = '#007bff84';
        }, 2000);
        setTimeout(() => {
            document.querySelector('.delete-timer-number').innerText = ' 0 ';
        document.querySelector('.delete-timer-number').style.backgroundColor = '#007bff4d';
        }
        , 3000);
    }
  }, [deleteAccountQuestion]);

  return (
    <div className="users-page">
{deleteAccountQuestion && (
            loadingDelete ? (
                    <div className="delete-card-question">
                        <div className="delete-card-question-wrapper">
                        <img
                        className="loading"
                          src="src/img/loading.png"
                          alt="Loading"
                          />
                        </div>
                      </div>
                    ) :
                      (<div className="delete-card-question">
                        <div className="delete-card-question-wrapper">
                                <div className="delete-timer">
                                    <span className="delete-timer-number"> 3 </span>
                                </div>
                        <p>Are you sure you want to delete user?</p>
                        <div className="delete-card-btns">
                        <button className="delete-card-btn" onClick={() => deleteUser(userToDelete)}>
                          Yes
                        </button>
                        <button
                          className="cancel-delete-card-btn"
                          onClick={() => setDeleteAccountQuestion(false)}
                          >
                          No
                        </button>
                        </div>
                          </div>
                      </div>)
                    )}

      {loading ? (
        <div className="users-loading">
          <img
            src="https://images2.imgbox.com/f5/8b/N9P4UPmE_o.png"
            alt="Loading"
            className="loading-spinner"
          />
          <p>Loading users...</p>
        </div>
      ) : error ? (
        <div className="users-error">
          <p>Error: {error}</p>
        </div>
      ) : users.length === 0 ? (
        <div className="users-empty">
          <p>No users found.</p>
        </div>
      ) : (
        <div className="users-grid">
          {users.map((user) => (
             <div key={user._id} className="user"
             onClick={() => {
                setUserToDelete(user._id)
                setDeleteAccountQuestion(true);
             }}
             >
             <div className="user-wrapper">
                 <div className="user-top">
                 <div className="user-header">
                     <div className="user-image-container">
                     <img className="user-image" src={user.image?.url} alt="User Profile" />
                     </div>
                     <div className="user-info">
                     <h1 className="user-name">{user.name.first} {user.name.last}</h1>
                     <p className="user-email">{user.email}</p>
                     </div>
                 </div>
                 </div>
             </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;