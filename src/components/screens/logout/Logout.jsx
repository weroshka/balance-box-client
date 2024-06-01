import { TOKEN } from '/src/app.constants'
import Cookies from 'js-cookie'

const Logout = () => {
	Cookies.remove(TOKEN)
	document.location = '/'
	return <></>
}

export default Logout
