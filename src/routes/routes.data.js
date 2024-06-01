import Add from '/src/components/screens/admin/add/Add'
import Edit from '/src/components/screens/admin/edit/Edit'
import List from '/src/components/screens/admin/list/List'
import ExpenseList from '/src/components/screens/expense-list/ExpenseList'
import Logout from '/src/components/screens/logout/Logout'
import Main from '/src/components/screens/main/Main.jsx'
import Profile from '/src/components/screens/profile/Profile'

export const routes = [
	{
		path: '/',
		component: Profile,
		isAuth: true
	},
	{
		path: '/',
		component: Main,
		isAuth: false
	},
	{
		path: '/expense/list',
		component: ExpenseList,
		isAuth: true
	},
	{
		path: '/logout',
		component: Logout,
		isAuth: true
	},
	{
		path: '/admin/list/:entity',
		component: List,
		isAuth: true
	},
	{
		path: '/admin/add/:entity/',
		component: Add,
		isAuth: true
	},
	{
		path: '/admin/edit/:entity/:id/',
		component: Edit,
		isAuth: true
	},
	{
		path: '/admin/delete/:entity/:id/',
		component: Main,
		isAuth: true
	}
]
