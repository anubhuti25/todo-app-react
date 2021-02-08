import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Alert from '../layout/Alert';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import CreateTodo from '../todo/Todo';
import PrivateRoute from '../routing/PrivateRoute';
import NotFound from '../layout/NotFound';

const Routes = () => {
    return (
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute exact path="/create-todo" component={CreateTodo} />
                <PrivateRoute exact path="/edit-todo/:batch/:id" component={CreateTodo} />
                <Route component={NotFound} />
            </Switch>
        </section>
    )
}

export default Routes
