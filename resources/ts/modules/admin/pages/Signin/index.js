import React, { useRef, useState } from 'react';
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

const Signin = ({ i18n, loginApi, authenticate }) => {
    const classes = useStyles();
    const emailRef = useRef(null);
    const emailInputProps = {
        maxLength: 255,
        pattern: `[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$`
    };

    const passwordRef = useRef(null);
    const passwordInputProps = {
        minLength: 8,
        maxLength: 255
    };

    const [requestSent, setRequestState] = useState(false);
    const [form, setState] = useState({
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
        remember: {
            value: false
        }
    });

    const onChange = (inputName) => ({ target: { value, checked } }) => {
        const currentInput = form[inputName];
        currentInput.value = (inputName === 'remember') ? checked : value;
        setState(prev => ({ ...prev, [inputName]: currentInput }));
    };

    const onBlur = inputName => () => {
        const currentInput = form[inputName];
        const { current } = currentInput.elRef;
        currentInput.message = current.validationMessage;
        currentInput.isError = !current.checkValidity();
        setState(prev => ({ ...prev, [inputName]: currentInput }));
    };

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {i18n['Login']}
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={e => {
                            e.preventDefault();
                            if (!e.target.checkValidity() || requestSent) {
                                return;
                            }
                            setRequestState(true);
                            const { email, password, remember } = form;
                            return loginApi({ email: email.value, password: password.value, remember: remember.value })
                                        .then(res => {
                                            console.log('res', res);
                                            authenticate();
                                        })
                                        .catch(err => {
                                            console.log('err', err);
                                            setRequestState(false);
                                        });
                        }}
                    >
                        <TextField
                            inputRef={emailRef}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={i18n['E-Mail Address']}
                            name="email"
                            autoComplete="email"
                            autoFocus
                            inputProps={emailInputProps}
                            onChange={onChange('email')}
                            onBlur={onBlur('email')}
                            value={form.email.value}
                            error={form.email.isError}
                            helperText={form.email.message}
                        />
                        <TextField
                            inputRef={passwordRef}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label={i18n['Password']}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputProps={passwordInputProps}
                            onChange={onChange('password')}
                            onBlur={onBlur('password')}
                            value={form.password.value}
                            error={form.password.isError}
                            helperText={form.password.message}
                        />
                        <FormControlLabel
                            value={form.remember.value}
                            control={<Checkbox value="remember" color="primary" />}
                            label={i18n['Remember Me']}
                            onChange={onChange('remember')}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={requestSent}
                        >
                            {i18n['Login']}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Box textAlign='right'>
                                    <Link href="#" variant="body2">
                                        {i18n['Forgot Your Password?']}
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