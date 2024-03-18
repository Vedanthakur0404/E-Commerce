import Cart from "../features/cart/Cart";
import Navbar from "../features/navbar/Navbar";
// import ProductList from "../features/product List/PoductList";

function CartPage(){
    return(
        <div>
            <Navbar>
                <Cart></Cart>
            </Navbar>
        </div>
    );
}

export default CartPage;