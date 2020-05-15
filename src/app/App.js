import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {
  CreateAccountPage,
  EmailConfirmationLanderPage,
  ProtectedRoute,
  SignInPage,
  useAuth,
} from '../auth';
import { ReservationsListPage } from '../reservations';
import {
  RestaurantDetailPage,
  SearchPage,
} from '../restaurants';
import {
  WriteAReviewPage,
  WriteAReviewThankYouPage,
} from '../reviews';
import { EditProfilePage } from '../user';
import './App.css';

/*
  This is the main React component that we render the rest of
  of app's components inside of. In our app, we're using this
  component to hold the Router and all the different Routes our
  app supports.
*/
export function App() {
  const { isLoading, user } = useAuth();
  return (
    <Router>
      <Switch>
        <Route path='/sign-in'>
          <SignInPage />
        </Route>
        <Route path='/create-account'>
          <CreateAccountPage />
        </Route>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/edit-profile'>
          <EditProfilePage />
        </ProtectedRoute>
        <Route path='/email-confirmation/success'>
          <EmailConfirmationLanderPage success />
        </Route>
        <Route path='/email-confirmation/failure'>
          <EmailConfirmationLanderPage />
        </Route>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/' exact>
          <ReservationsListPage />
        </ProtectedRoute>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/search'>
          <SearchPage />
        </ProtectedRoute>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/restaurants/:id'>
          <RestaurantDetailPage />
        </ProtectedRoute>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/write-a-review/:id'>
          <WriteAReviewPage />
        </ProtectedRoute>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/review/thank-you'>
          <WriteAReviewThankYouPage />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}
