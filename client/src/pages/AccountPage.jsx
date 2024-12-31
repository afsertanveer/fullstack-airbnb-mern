import React, { useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import PlacesPage from './PlacesPage';
import Loader from './utils/Loader/Loader';

function AccountPage() {
  const { user, setUser, isLoading } = useContext(UserContext);
  let { subpage } = useParams();
  const navigator = useNavigate();
  // console.log(subpage);
  if (subpage === undefined) {
    subpage = 'profile';
  }
  // Show loader while checking authentication
  if (isLoading) {
    return <Loader />;
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Render the account page when the user is authenticated
  function linkClasses(type = null) {
    let classes = 'py-2 px-6';
    if (type === subpage) {
      classes += ' bg-primary text-white rounded-full';
    }
    return classes;
  }

  return (
    <div className="mt-10">
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name}({user.email})<br />
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
}

export default AccountPage;
