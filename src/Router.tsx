import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Account, { loader as accountLoader } from './Account'
import Accounts, { loader as accountsLoader } from './Accounts'
import Confirm, { action as confirmAction, loader as confirmLoader } from './Confirm'
import { rootPath } from './Data'
import ErrorPage from './Error'
import Login, { action as loginAction } from './Login'
import Pay, { action as payAction, loader as payLoader } from './Pay'
import Scheduled, { loader as scheduledLoader } from './Scheduled'
import Shell, { loader as shellLoader } from './Shell'
import Transfer, { action as transferAction, loader as transferLoader } from './Transfer'

const router = createBrowserRouter([
  {
    path: rootPath,
    element: <Shell />,
    loader: shellLoader,
    action: loginAction,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'accounts',
        element: <Accounts />,
        loader: accountsLoader,
      },
      {
        path: 'account/:acct',
        element: <Account />,
        loader: accountLoader,
      },
      {
        path: 'confirm',
        element: <Confirm />,
        loader: confirmLoader,
        action: confirmAction,
      },
      {
        path: 'pay',
        element: <Pay />,
        loader: payLoader,
        action: payAction,
      },
      {
        path: 'scheduled',
        element: <Scheduled />,
        loader: scheduledLoader,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'transfer',
        element: <Transfer />,
        loader: transferLoader,
        action: transferAction,
      },
      {
        path: '',
        element: <Login />,
        action: loginAction,
      },
    ],
  },
])

const Router = () => {
  return <RouterProvider router={router} />
}

export default Router
