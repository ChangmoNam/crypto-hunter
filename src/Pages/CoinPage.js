import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import { makeStyles } from '@material-ui/core/styles';
import CoinInfo from '../components/CoinInfo';
import HTMLReactParser from 'html-react-parser'
import Typography from '@material-ui/core/Typography'
import { numberWithCommas } from '../components/Carousel';
import LinearProgress from '@material-ui/core/LinearProgress';

const CoinPage = () => {

    const [coin, setCoin] = useState();
    const { id } = useParams();

    const fetchSingle = async () => {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data); 
    }
    // console.log(coin);
    const currency = 'krw';
    useEffect(() => {
        fetchSingle();
    }, [currency]);

    const useStyles = makeStyles((theme) => ({
        container: {
            display: "flex",
            [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center"
            }
        },
        sidebar: {
            width: "30%",
            [theme.breakpoints.down("md")]: {
                width: "100%",
                // alignItems: "center"
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 25,
            borderRight: "2px solid grey",
        },
        heading: {
            fontWeight: "bold",
            marginBottom: 20
        },
        description: {
            width: "100%",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
        },
        marketData: {
            alignSelf: "start",
            padding: 25,
            paddingTop: 10,
            width: "100%",
            [theme.breakpoints.down("md")]: {
                display: "flex",
                justifyContent: "space-around",
            },
            [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                alignItems: "center"
            },
            [theme.breakpoints.down("xs")]: {
                alignItems: "start"
            }
        }
    }));
    const classes = useStyles();

    if (!coin) return <LinearProgress style={{ backgroundColor: 'gold' }} />

    return (
        <div className={classes.container}>
            {/* sidebar */}
            <div className={classes.sidebar}>
                <img 
                    src={coin?.image.large}
                    alt={coin?.name}
                    height="200"
                    style={{marginBottom: 20}}
                    loading="lazy"
                />
                <Typography variant="h3" className={classes.haeding}>
                    {coin?.name}
                </Typography>
                <Typography varaint="subtitle1" className={classes.description}>
                    {coin ? HTMLReactParser(coin?.description.en.split(". ")[0]) : <></> }
                </Typography>
                <div className={classes.marketData}>
                    <span style={{display: "flex"}}>
                        <Typography variant="h5" className={classes.heading}>
                            Rank:
                        </Typography>
                        &nbsp;&nbsp;
                        <Typography
                            variant="h5"
                        >
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>
                    <span style={{display: "flex"}}>
                        <Typography variant="h6" className={classes.heading}>
                            Current Price:
                        </Typography>
                        &nbsp;&nbsp;
                        <Typography
                            variant="h6"
                        >
                            {console.log(coin?.market_data.current_price.krw)}
                            {coin? <>&#8361; {numberWithCommas(coin?.market_data.current_price.krw)}</>:<></>}
                    
                        </Typography>
                    </span>
                    <span style={{display: "flex"}}>
                        <Typography variant="h6" className={classes.heading}>
                            Market Cap:
                        </Typography>
                        &nbsp;&nbsp;
                        <Typography
                            variant="h6"
                        >
                            {console.log(coin)}
                            {coin? <>&#8361; {numberWithCommas(coin?.market_data.market_cap.krw).toString().slice(0, -8)}M</>: <></>}
                        </Typography>
                    </span>
                </div>
            </div>

            {/* chart */}
            <CoinInfo coin={coin}/>
            
        </div>
    )
}

export default CoinPage
