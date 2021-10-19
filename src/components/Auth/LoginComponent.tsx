import * as React from 'react';
import { IAuthState, ILoginFrom, ILoginState } from '@/types/AuthTypes';
import { loginThunk } from '@/apis/authApis';
import { useHistory } from 'react-router';
import './login.scss';

interface ILoginProps {
  // dispatchLoginEpicRequest: (args: ILoginFrom) => void;
  dispatchLoginThunkSuccess: (args: IAuthState) => void;
  dispatchLoginThunkFailure: () => void;
  dispatchSaveToken: (args: IAuthState) => void;
  loginState: ILoginState;
}

const LoginComponent: React.FunctionComponent<ILoginProps> = React.memo(
  ({
    loginState,
    // dispatchLoginEpicRequest,
    dispatchLoginThunkSuccess,
    dispatchLoginThunkFailure,
    dispatchSaveToken,
  }) => {
    const history = useHistory();
    const [userInfo, setUserInfo] = React.useState<ILoginFrom>({
      username: '',
      password: '',
    });

    const handleLoginClick = () => {
      loginThunk(userInfo)
        .then((payload) => {
          dispatchLoginThunkSuccess(payload.data);
          dispatchSaveToken(payload.data);
          localStorage.setItem('access_token', payload.data.accessToken);
          localStorage.setItem('refresh_token', payload.data.refreshToken);
          localStorage.setItem('user', JSON.stringify(payload.data.user));
          history.push('/home');
        })
        .catch((error) => {
          console.log(error);
          dispatchLoginThunkFailure();
        });
    };

    if (loginState && loginState.loading) return <p>Loading...</p>;
    if (loginState && loginState.error) return <p>Error :(</p>;
    return (
      <div className="container-fluid login-container">
        <div className="row">
          <div className="col"> login page </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) => {
                setUserInfo({ ...userInfo, username: e.target.value });
              }}
              value={userInfo.username}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => {
                setUserInfo({ ...userInfo, password: e.target.value });
              }}
              value={userInfo.password}
            />
          </div>
          <div className="mb-3">
            <button onClick={handleLoginClick}>Login</button>
          </div>
        </div>
      </div>
    );
  }
);

export default LoginComponent;
