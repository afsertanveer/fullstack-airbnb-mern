import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import AccountPage from './pages/AccountPage';
import BookingPage from './pages/BookingPage';
import BookingsPage from './pages/BookingsPage';
import EditPlacePage from './pages/EditPlacePage';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SinglePlacePage from './pages/SinglePlacePage';
import UserContextProvider from './UserContextProvider';

if (import.meta.env.MODE === 'development') {
  // console.log(import.meta.env.VITE_API_URL);
}

function App() {
  return (
    <div className="mx-0 lg:mx-10 ">
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="/account/bookings" element={<BookingsPage />} />
            <Route path="/account/booking/:id" element={<BookingPage />} />
            <Route path="/account/place/:id" element={<SinglePlacePage />} />
            <Route
              path="/account/places/edit/:id"
              element={<EditPlacePage />}
            />
            <Route path="account">
              <Route index element={<AccountPage />} /> {/* Default account */}
              <Route path=":subpage">
                <Route index element={<AccountPage />} /> {/* Subpage */}
                <Route path=":action" element={<AccountPage />} />{' '}
                {/* Subpage + Action */}
              </Route>
            </Route>
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
