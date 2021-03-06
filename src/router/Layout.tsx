import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import { loginContext } from "../context/authContext";
import Home from "../page/Home";
import Login from "../page/Login";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const logigCtx = useContext(loginContext);

  const PrivateRoute: React.FC<any> = ({
    component: CustomComponent,
    isLogin,
    path,
    ...rest
  }) => {
    const renderCustomerComponent = (props: any) => (
      <CustomComponent {...props} />
    );
    if (isLogin) {
      return <Route {...rest} render={renderCustomerComponent} />;
    }

    return <Redirect to="login" />;
  };

  const PublicRoute: React.FC<any> = ({
    component: CustomComponent,
    isLogin,
    path,
    ...rest
  }) => {
    if (!isLogin) {
      const renderCustomerComponent = (props: any) => (
        <CustomComponent {...props} />
      );
      return <Route {...rest} render={renderCustomerComponent} />;
    }

    return <Redirect to="/" />;
  };

  return (
    <>
      <Header />
      <BrowserRouter>
        <Switch>
          <PrivateRoute
            exact
            isLogin={logigCtx.isLogin}
            path="/"
            component={Home}
          />
          <PublicRoute
            exact
            isLogin={logigCtx.isLogin}
            path="/login"
            component={Login}
          />
          {/* <Route path="*" component={NotFound} /> */}
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Layout;
