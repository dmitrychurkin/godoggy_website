import React, { useRef } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const Signin = ({ i18n }) => {
    const classes = useStyles();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const form = useLocalStore(() => ({
        email: {
            value: '',
            isError: false,
            message: '',
            elRef: emailRef
        },
        password: {
            value: '',
            isError: false,
            message: '',
            elRef: passwordRef
        },
        rememberMe: {
            value: false
        },
        handleInput: inputName => event => {
            const currentInput = form[inputName];
            currentInput.value = event.target.value;
            
        }
    }));

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        { i18n['Login'] }
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            ref={emailRef}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={ i18n['E-Mail Address'] }
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            ref={passwordRef}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label={ i18n['Password'] }
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label={ i18n['Remember Me'] }
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            { i18n['Login'] }
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Box textAlign='right'>
                                    <Link href="#" variant="body2">
                                        { i18n['Forgot Your Password?'] }
                                    </Link>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Typography variant="body2" color="textSecondary" align="center">
                                Built with ❤ by Dmitry
                            </Typography>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default Signin;