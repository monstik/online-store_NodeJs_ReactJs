import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Container, Spinner} from "react-bootstrap";
import AlertDismissible from "./components/AlertDismissible";
import {fetchBasket} from "./http/basketAPI";


const App = observer(() => {
    const {user, basket, alertMessage} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check().then(data => {
            user.setUser(data);
            user.setIsAuth(true);
        }).finally(() => setLoading(false));
        fetchBasket()
            .then(data => {

                basket.setBasket(data.basket)
                basket.setBasketCount(data.basketCount);
                basket.setTotalPrice(data.totalPrice)
            })

    }, [user.isAuth])
    useEffect(() => {

        if (basket.isBasketUpdated) {

            fetchBasket()
                .then(data => {
                    console.log('test')
                    basket.setBasket(data.basket)
                    basket.setBasketCount(data.basketCount);
                    basket.setTotalPrice(data.totalPrice);
                })
        }
    }, [basket.isBasketUpdated])

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <Spinner animation={"grow"}/>
            </Container>
        )
    }


    return (
        <BrowserRouter>
            <NavBar/>
            {alertMessage.isVisible && <AlertDismissible/>}
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;
