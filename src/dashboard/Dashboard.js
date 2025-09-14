
import MainLayout from '../components/MainLayout';
import { useAuth } from "../auth/AuthContext";
import { Link } from 'react-router-dom';


function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <> 
 <MainLayout> 

    <div className='container'>
    <div className="row">
        <div className="col-12">
      <h2>Welcome {user.username} 🎉</h2>
      <button onClick={logout}>Logout</button>

       <Link className="nav-link" to="/edit-contact"> Edit Contact Info </Link>
        </div>
    </div>
    </div>
    </MainLayout>
    </>
  );
}

export default Dashboard;
