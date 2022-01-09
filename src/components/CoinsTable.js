import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { CoinList } from "../config/api";
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
// import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import {Pagination} from '@material-ui/lab';
import TableRow from '@material-ui/core/TableRow';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { numberWithCommas } from "./Carousel";
import { makeStyles } from '@material-ui/core/styles';


const CoinsTable = () => {

    const history = useNavigate();
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const useStyles = makeStyles(() => ({
        pagination: {
            "& .MuiPatinationItem-root": {
                color: "gold",
            }
        }
    }))
    const classes = useStyles();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList());
        setCoins(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCoins();
    }, []);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        }
    })

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(search.toLowerCase())
        );
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{textAlign: "center"}}>
                <Typography variant="h4" style={{margin: 18}}>
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField variant="outlined" label="Search for a crypto currency"
                style={{marginBottom:20, width:"90%"}}
                    onChange={(e) => setSearch(e.target.value)} />
            </Container>
            {/* <Paper> */}
            <TableContainer style={{width:"90%", margin:"auto"}}>
                {loading? (
                    <LinearProgress style={{backgroundColor:"gold"}}/>)
                    : (
                    <Table>
                        <TableHead style={{backgroundColor:"#EEBC1D"}}>
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                    <TableCell
                                        style={{
                                            color:"black",
                                            fontWeight: "700"
                                        }}
                                        key={head}
                                        align={head === "Coin" ? "" : "right"}
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {handleSearch()
                                .slice((page-1) * 10, (page-1) * 10 + 10)
                                .map(row=>{
                                const profit = row.price_change_percentage_24h > 0;

                                return (
                                    <TableRow 
                                        // onClick={() => history(`/coins/${row.id}`)}
                                        // style={{cursor:"pointer"}}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            // onClick={() => history(`/coins/${row.id}`)}
                                            styles={{
                                                display:"flex",
                                                gap: 15,
                                            }}
                                        >
                                            <img 
                                                onClick={() => history(`/coins/${row.id}`)}
                                                src={row?.image}
                                                alt={row.name}
                                                height="50"
                                                style={{marginBottom: 10, cursor:"pointer"}}
                                            />
                                            <div
                                                style={{display:"flex", flexDirection:"column"}}
                                            >
                                                <span
                                                    style={{
                                                        textTransform: "uppercase",
                                                        fontSize: 22,
                                                    }}
                                                >
                                                    {row.symbol}
                                                </span>
                                                <span style={{color:"dartgrey"}}>
                                                    {row.name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            &#8361;{numberWithCommas(row.current_price.toFixed(2))}
                                        </TableCell>
                                        <TableCell 
                                            style={{
                                                color: profit>0 ? "rgb(14, 203, 129)" : "red",
                                                fontWeight: 500,
                                            }}
                                            align="right"
                                        >
                                            {profit && "+"}{row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell align="right">
                                            &#8361;{numberWithCommas(row.market_cap.toString())}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            <Pagination 
                style={{
                    padding:20,
                    width: "100%",
                    display:"flex",
                    justifyContent:"center"
                }}
                classes={{ul: classes.pagination}}
                count={(handleSearch()?.length/10).toFixed(0)}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
            />
        </ThemeProvider>
    )
}

export default CoinsTable
