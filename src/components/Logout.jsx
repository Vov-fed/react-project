import { useNavigate } from "react-router-dom";

function Logout() {
    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload(); // Add parentheses to invoke the function
    }
    return (
        <button onClick={logout}>Logout</button>
    );
}
export default Logout;