import { FaSignInAlt, FaSignOutAlt, FaUser, FaShoppingCart } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { GiChocolateBar } from "react-icons/gi";
// import { addToCart, resetCartState } from "../features/cart/cartSlice";


function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {user} = useSelector((state) =>  state.auth )
  const { cartCount } = useSelector((state) => state.cart)
  const onLogout = () => {
    console.log('logout')
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
        <div className="logo">
        <Link to='/'>Shopping Desk</Link>
        </div>
        <ul>
          {
            user ? (
              <>
              <li>
              <Link to='/cart'>

                <button className='btn ' 
                
                > <FaShoppingCart /> Cart {cartCount} </button>
              </Link>
              </li>
               <li>
              <Link to='/products'>

                <button className='btn ' 
                
                > <GiChocolateBar /> Products </button>
              </Link>
              </li>
              <li>
                <button className='btn ' 
                onClick={onLogout}
                > <FaSignOutAlt/> Logout </button>
              </li>
                </>
            ) : (
            <>

            <li>
              <Link to='/login'>
              <FaSignInAlt/> Login
              </Link>
          </li>
          <li>
              <Link to='/register'>
              <FaUser/> Register
              </Link>
          </li>
            </>
          
          )
          }
            
        </ul>
    </header>
  )
}

export default Header