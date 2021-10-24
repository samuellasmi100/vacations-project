import { Chart } from '../Admin/Chart/Chart'
import { Fragment } from 'react'
import { Header } from '../Header/Header'
import {BrowserRouter as Router , Switch, Route } from 'react-router-dom'
import './Layout.css';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { AddVacation } from '../Admin/AddVacation/AddVacation';
import { PrivateRoute } from '../Admin/PrivateRoute/PrivateRoute';
import { Edit } from '../Admin/Edit/Edit';
import { LogOut } from '../LogOut/LogOut';
import { Register } from '../Register/Register';
import { Vacations } from '../Vacations/Vacations';
import { Footer } from '../Footer/Footer';

export const Layout = () => {
    return (
            <Fragment>
            <Router>
                <Header />
                <Route exact path='/' component={Home} />
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/vacations' component={Vacations} />
                    <Route exact path='/logout' component={LogOut} />
                    <PrivateRoute exact path='/add' component={AddVacation} />
                    <PrivateRoute exact path='/chart' component={Chart} />
                    <PrivateRoute exact path='/edit/:id' component={Edit} />
                </Switch>
                    <Footer/>
             </Router>
            </Fragment>
    )
}
