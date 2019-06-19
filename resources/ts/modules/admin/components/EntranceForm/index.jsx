import React, { useRef, useState } from 'react';
import { Link as RouterLink, Route, Redirect } from 'react-router-dom';
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

import useStyles from './styles';


const EntranceForm = ({
    i18n,
    loginApi,
    updateStore,
    sendPasswordResetApi,
    resetPasswordApi,
    setToast,
    setRequest
}) => {
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

    const confirmPasswordRef = useRef(null);

    const [requestSent, setRequestState] = useState(false);
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
        password_confirmation: {
            value: '',
            isError: false,
            message: '',
            elRef: confirmPasswordRef
        },
        remember: {
            value: false
        }
    });
    const [form, setState] = useState(
        initialInputState()
    );
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

    const handleApiError = err => {
        console.dir(err);
        const { response } = err;
        if (typeof response.data === 'object') {
            const { message = 'Error occured', errors = {} } = response.data;
            setToast({ message: `${message} ${Object.values(errors).map(errArr => errArr.join(' '))}`, isOpen: true });
        }
        setRequestState(false);
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

    const ConfirmPasswordField = (
        <TextField
            inputRef={confirmPasswordRef}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password_confirmation"
            label={i18n['Confirm Password']}
            type="password"
            id="password_confirmation"
            autoComplete="current-password"
            inputProps={passwordInputProps}
            onChange={onChange('password_confirmation')}
            onBlur={onBlur('password_confirmation')}
            value={form.password_confirmation.value}
            error={form.password_confirmation.isError}
            helperText={form.password_confirmation.message}
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
                                                .then(response => {
                                                    const { success = false, user = null } = (response && response.data) || {};
                                                    updateStore({
                                                        authenticated: success,
                                                        guest: !success,
                                                        user
                                                    });

                                                    if (!success) {
                                                        setRequestState(false);
                                                        setToast({
                                                            isOpen: true,
                                                            message: 'Error occured while logging in'
                                                        });
                                                    }
                                                })
                                                .catch(handleApiError)
                                                .finally(() => setRequest(false));
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
                                                    const { status = '', success = false } = (response && response.data) || {};
                                                    setToast({
                                                        isOpen: true,
                                                        message: status || 'Error occured while sending password reset link',
                                                        variant: status ? (success ? 'success' : 'warning') : 'error'
                                                    });
                                                    if (success) {
                                                        setState(
                                                            initialInputState()
                                                        );
                                                    } else {
                                                        setRequestState(false);
                                                    }
                                                })
                                                .catch(handleApiError)
                                                .finally(() => setRequest(false));
                                        }}
                                    >
                                        {EmailField}
                                        <SubmitButton text={i18n['Send Password Reset Link']} />
                                    </form>
                                </>
                            )}
                        />
                        <Route
                            path='/password/reset/:password_reset?'
                            render={({ match: { params: { password_reset = '' } } }) => (
                                <>
                                    {!password_reset && <Redirect to='/login' />}
                                    <Avatar className={classes.avatar}>
                                        <VpnKey />
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
                                            const { email, password, password_confirmation } = form;
                                            setRequestState(true);

                                            return resetPasswordApi({
                                                email: email.value,
                                                password: password.value,
                                                password_confirmation: password_confirmation.value,
                                                token: window.location.pathname.split('/').slice(-1)[0]
                                            })
                                                .then(response => {
                                                    console.log('resetPasswordApi then response => ', response);
                                                    const { status = '', success = false, user = null } = (response && response.data) || {};

                                                    if (!(success && !status)) {
                                                        setToast({
                                                            isOpen: true,
                                                            message: status || 'Error occured while resetting password',
                                                            variant: status ? (success ? 'success' : 'warning') : 'error'
                                                        });
                                                    }

                                                    if (success) {
                                                        updateStore({
                                                            authenticated: success,
                                                            guest: !success,
                                                            user
                                                        });
                                                    } else {
                                                        setRequestState(false);
                                                    }
                                                })
                                                .catch(handleApiError)
                                                .finally(() => setRequest(false));
                                        }}
                                    >
                                        {EmailField}
                                        {PasswordField}
                                        {ConfirmPasswordField}
                                        <SubmitButton text={i18n['Reset Password']} />
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
        </>
    );
};

export default EntranceForm;