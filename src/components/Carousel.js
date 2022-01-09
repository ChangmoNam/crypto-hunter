import { useEffect, useState } from 'react';
// import carousels from 'react-responsive-carousel';
import { TrendingCoins } from '../config/api.js'
import axios from 'axios'
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import { makeStyles } from "@material-ui/core/styles"

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {

    const useStyles = makeStyles((theme) => ({
        carousel: {
            height: "50%",
            display: "flex",
            alignItems: "center"
        },
        carouselItem: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            textTransform: "uppercase",
            color: "white"
        }
    }))
    const classes = useStyles();

    const [trending, setTrending] = useState([]);
    const currency = "krw"
    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins());
        
        setTrending(data);
    }
    
    useEffect(() => {
        fetchTrendingCoins();
    }, [currency])

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
                <img 
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span style={{
                        color: profit>0 ? "rgb(14, 203, 129":"red",
                        fontWeight: 'bold'
                    }}>
                        {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{fontSize: 22, fontweight:500}}>
                    &#8361;{numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>   
        )
    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    return (
        <div className={classes.carousel}>
            <AliceCarousel 
                items={items}
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                    responsive={responsive}
                    autoPlay
            />
            
        </div>
    )
}

export default Carousel
