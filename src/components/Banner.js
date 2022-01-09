import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import Carousel from './Carousel';

const Banner = () => {

    const useStyles = makeStyles({
        banner: {
            backgroundImage: "url(./background.jpg)",
        },
        bg: {
            height: 350,
            display:'flex',
            // position: 'relative',
            justifyContent: 'space-around',
            flexDirection: "column",
            paddingTop: 25
        },
        centerText: {
            display: 'flex',
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: 'center',
            // marginTop: 80,
            color:'gold',
            fontWeight: 'bold',
            padding: 0,
        },
    })
    const classes = useStyles();
    return (
        <div className={classes.banner}>
            <Container className={classes.bg}>
                <div className={classes.centerText}>
                <Typography variant="h2" style={{fontWeight:"bold", marginBottom: 15}}>
                    Crypto Hunter
                </Typography>
                <Typography variant="subtitle2" style={{color: "darkgrey", textTransform:"capitalize"}}>
                    Get all the info
                </Typography>
                </div>
                
                <Carousel />
             
                {/* <Carousel /> */}
       
            </Container>
        </div>
    )
}

export default Banner;