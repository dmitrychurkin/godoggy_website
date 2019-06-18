import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { Link as RouterLink, Route } from 'react-router-dom';
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
import Build from '@material-ui/icons/Build';
import VpnKey from '@material-ui/icons/VpnKey';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Toast from '../Toast';
import { ToastType } from '../Toast';
import useStyles from './styles';

const initialInputState = () => ({
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

const EntranceForm = ({ i18n, loginApi, updateStore, sendPasswordResetApi }) => {
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
    const [form, setState] = useState(
        ...initialInputState()
    );
    const [snackbar, setSnackbarState] = useState({ message: '', isOpen: false, variant: 'error' });
    const closeSnakbar = () => setSnackbarState(prev => ({ ...prev, isOpen: false }));
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

    const EmailField = (
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
    );

    const PasswordField = (
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
    );

    const SubmitButton = ({ text }) => (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={requestSent}
        >
            {text}
        </Button>
    );

    return (
        <>
            <Grid container component="main" className={classes.root}>
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Route
                            path='/login'
                            render={() => (
                                <>
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
                                            return loginApi({ email: email.value, password: password.value, remember: remember.value || undefined })
                                                .then(({ data: { success = false, user = null } }) => {
                                                    updateStore({
                                                        authenticated: success,
                                                        guest: !success,
                                                        user
                                                    });
                                                })
                                                .catch(({ response }) => {
                                                    if (typeof response.data === 'object') {
                                                        const { message = 'Error occured', errors } = response.data;
                                                        setSnackbarState(prev => ({ ...prev, message: `${message} ${Object.values(errors).map(errArr => errArr.join(' '))}`, isOpen: true }));
                                                    }
                                                    setRequestState(false);
                                                });
                                        }}
                                    >
                                        {EmailField}
                                        {PasswordField}
                                        <FormControlLabel
                                            value={form.remember.value}
                                            control={<Checkbox value="remember" color="primary" />}
                                            label={i18n['Remember Me']}
                                            onChange={onChange('remember')}
                                        />
                                        <SubmitButton text={i18n['Login']} />
                                        <Grid container>
                                            <Grid item xs>
                                                <Box textAlign='right'>
                                                    <Link to='/reset-password' component={RouterLink} variant="body2">
                                                        {i18n['Forgot Your Password?']}
                                                    </Link>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </>
                            )}
                        />
                        <Route
                            path='/reset-password'
                            render={() => (
                                <>
                                    <Avatar className={classes.avatar}>
                                        <Build />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        {i18n['Reset Password']}
                                    </Typography>
                                    <form
                                        className={classes.form}
                                        noValidate
                                        onSubmit={e => {
                                            e.preventDefault();
                                            if (!e.target.checkValidity() || requestSent) {
                                                return;
                                            }
                                            const { email } = form;
                                            setRequestState(true);

                                            return sendPasswordResetApi({ email: email.value })
                                                .then(response => {
                                                    console.log('sendPasswordResetApi then response => ', response);
                                                    const { status = '', success = false } = response.data || {};
                                                    setSnackbarState({
                                                        isOpen: true,
                                                        message: status || 'Error occured while sending password rest link',
                                                        variant: status ? (success ? 'success' : 'warning') : 'error'
                                                    });
                                                    if (!success) {
                                                        setRequestState(false);
                                                    } else {
                                                        setState(initialInputState());
                                                    }
                                                })
                                                .catch(({ response }) => {
                                                    if (typeof response.data === 'object') {
                                                        const { message = 'Error occured', errors } = response.data;
                                                        setSnackbarState(prev => ({ ...prev, message: `${message} ${Object.values(errors).map(errArr => errArr.join(' '))}`, isOpen: true }));
                                                    }
                                                    console.log(response);
                                                    setRequestState(false);
                                                });
                                        }}
                                    >
                                        {EmailField}
                                        <SubmitButton text={i18n['Send Password Reset Link']} />
                                    </form>
                                </>
                            )}
                        />
                        <Box mt={5}>
                            <Typography variant="body2" color="textSecondary" align="center">
                                Built with ❤ by Dmitry
                            </Typography>
                        </Box>
                    </div>
                </Grid>
            </Grid>
            <Toast
                isOpen={snackbar.isOpen}
                onClose={closeSnakbar}
                variant={snackbar.variant}
                message={snackbar.message}
            />
        </>
    );
};

export default EntranceForm;