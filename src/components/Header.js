import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const Header = () => {
    
    const useStyles = makeStyles({
        title: {
            flex: 1
        },
        link: {
            flex: 1,
            color: 'white'
        },
        button: {
            display: 'block',
            marginTop: '100hv'
        }
    });

    const classes = useStyles();

    const [currency, setCurrency] = useState('USD');
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setCurrency(event.target.value);
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };


    return (
        <AppBar color='secondary' position='static'>
            <Container>
                <Toolbar>
                    <Typography className={classes.title}>
                        <Link to="/" className={classes.link}>
                            Crypto Hunter
                        </Link>
                    </Typography>
                    <Select
                        className={classes.title}
                        variant="outlined"
                        style={{
                            width: 30,
                            height: 40,
                            marginLeft: 15
                        }}
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={currency}
                        onChange={handleChange}
                        autoWidth
                    >                        
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="KOR">KOR</MenuItem>
                    </Select>
                </Toolbar>
                {/* <Typography className={classes.title}>
                    <Link to="/" className={classes.link}>
                        Crypto Hunter
                    </Link>
                </Typography>
                <Select
                    className={classes.title}
                    variant="outlined"
                    style={{
                        width: 100,
                        height: 40,
                        marginLeft: 15
                    }}
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={currency}
                    onChange={handleChange}
                    autoWidth
                >                        
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="KOR">KOR</MenuItem>
                </Select> */}

            </Container>
        </AppBar>
    )
}

export default Header
