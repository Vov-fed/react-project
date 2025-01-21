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
  const [timer, setTimer] = useState(3);

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


  const getBackgroundColor = (value) => {
    switch (value) {
        case 3:
            return "#007bff4d";
            case 2:
                return "#007bff84";
                case 1:
                    return "#007bffae";
                    case 0:
                        return "#007bff";
                        default:
                            return "#007bff4d";
                        }
                    };

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
        setTimer(3);
        
        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev === 0) {
                    setDeleteAccountQuestion(false);
                    clearInterval(countdown);
                }
                return prev - 1;
            });
        }, 1000);
        
        return () => clearInterval(countdown);
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
                        <div
                                className="delete-timer"
                                style={{
                                    backgroundColor: getBackgroundColor(timer),
                                    borderRadius: "50%",
                                    width: "50px",
                                    height: "50px",
                                    display: "flex",
                                    marginBottom: "20px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <span
                                    className="delete-timer-number"
                                    style={{
                                        fontSize: "20px",
                                        color: "white",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {timer}
                                </span>
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