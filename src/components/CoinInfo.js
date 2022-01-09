import axios from "axios";
import { useEffect, useState } from "react"
import { HistoricalChart } from "../config/api";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { Line } from "react-chartjs-2";
import { Chart, Tooltip, CategoryScale, LinearScale, Title, PointElement, LineElement } from 'chart.js';
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

// 이거 무엇 ? 필수 없으면 안 됨
Chart.register(Tooltip, CategoryScale, LinearScale, Title, PointElement, LineElement);

const CoinInfo = (coin) => {

    const [historicalData, sethistoricalData] = useState();
    const [days, setDays] = useState(1);
    const [radius, setRadius] = useState(5);

    const fetchHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.coin.id, days));
        sethistoricalData(data.prices);
        
        if(days===1) setRadius(3)
        else if(days===30) setRadius(2)
        else if(days===90) setRadius(2)
        else setRadius(1)
    }

    useEffect(() => {
        fetchHistoricalData();
    }, [days]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        }
    })

    const useStyles = makeStyles((theme) => ({
        container: {
            width: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            padding: 40,
            [theme.breakpoints.down("md")]: {
                width: "100%",
                marginTop: 0,
                padding: 20,
                paddingTop: 0
            }
        }
    }));
    const classes = useStyles();

    return (

        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {
                  !historicalData ? (
                    <CircularProgress
                        style={{color:'gold'}}
                        size={250}
                        thickness={1}
                    />
                  ):(<>
                    <Line 
                        data={{
                            labels: historicalData.map((coin) => {
                                let date = new Date(coin[0]);
                                let time =
                                    date.getHours() > 12
                                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                    : `${date.getHours()}:${date.getMinutes()} AM`;
                                return days===1 ? time : date.toLocaleDateString();
                            }),
                            datasets: [
                                {
                                    data: historicalData.map((coin) => coin[1]),
                                    label: `Price ( Past ${days} Days) in krw`,
                                    borderColor: "#EEBC1D"
                                }
                            ]
                        }}
                        options={{
                            elements: {
                                point: {
                                    radius,
                                }
                            }
                        }}
                    />
                    <div style={{
                        display: "flex",
                        marginTop: 20,
                        justifyContent: "space-around",
                        width: "100%"
                    }}>
                        {chartDays.map(day=>(
                            <SelectButton
                                key={day.value}
                                onClick={()=>setDays(day.value)}
                                selected={day.value === days}
                            >
                                {day.label}
                            </SelectButton>
                        ))}
                    </div>
                  </>)
                }
            </div>
            <div>

            </div>
            
        </ThemeProvider>

    )
}

export default CoinInfo
