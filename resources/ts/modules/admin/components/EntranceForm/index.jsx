import React, { useState, useEffect } from 'react';
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
import { onChange, onBlur, getForm, emailValidationConstraints, passwordValidationConstraints, restrictLinkFollow } from '../../lib/formHelpers';
import useStyles from './styles';
import { RESET_PWD_ROUTE, LOGIN_ROUTE } from '../../constants';

const EntranceForm = ({
    i18n,
    loginApi,
    sendPasswordResetApi,
    resetPasswordApi,
    isRequestSent
}) => {
    const emailResetPwdAttrs = {};
    const { pathname } = window.location;
    if (pathname.includes('/admin/password/reset/')) {
        const emailValue = new URLSearchParams(window.location.search).get('email');
        if (emailValue) {
            emailResetPwdAttrs.value = emailValue;
            emailResetPwdAttrs.disabled = true;
        }
    }
    const classes = useStyles();
    const requestState = useState(false);
    const [form, setState] = useState(
        getForm(
            { inputName: 'email', ...emailResetPwdAttrs },
            { inputName: 'password' },
            { inputName: 'password_confirmation' },
            { inputName: 'remember', ref: null, value: false }
        )
    );

    const EmailField = (
        <TextField
            inputRef={form.email.ref}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label={i18n['E-Mail Address']}
            name='email'
            autoComplete='email'
            autoFocus
            inputProps={emailValidationConstraints}
            onChange={onChange('email', [form, setState])}
            onBlur={onBlur('email', [form, setState])}
            value={form.email.value}
            error={form.email.isInvalid}
            helperText={form.email.validationMessage}
            disabled={form.email.disabled}
        />
    );

    const PasswordField = (
        <TextField
            inputRef={form.password.ref}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label={i18n['Password']}
            type='password'
            id='password'
            autoComplete='current-password'
            inputProps={passwordValidationConstraints}
            onChange={onChange('password', [form, setState])}
            onBlur={onBlur('password', [form, setState])}
            value={form.password.value}
            error={form.password.isInvalid}
            helperText={form.password.validationMessage}
        />
    );

    const ConfirmPasswordField = (
        <TextField
            inputRef={form.password_confirmation.ref}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password_confirmation'
            label={i18n['Confirm Password']}
            type='password'
            id='password_confirmation'
            autoComplete='current-password'
            inputProps={passwordValidationConstraints}
            onChange={onChange('password_confirmation', [form, setState])}
            onBlur={onBlur('password_confirmation', [form, setState])}
            value={form.password_confirmation.value}
            error={form.password_confirmation.isInvalid}
            helperText={form.password_confirmation.validationMessage}
        />
    );

    const SubmitButton = ({ text }) => (
        <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={requestState[0]}
        >
            {text}
        </Button>
    );

    return (
        <>
            <Grid container component='main' className={classes.root}>
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Route
                            path={LOGIN_ROUTE}
                            render={() => (
                                <>
                                    <Avatar className={classes.avatar}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component='h1' variant='h5'>
                                        {i18n['Login']}
                                    </Typography>
                                    <form
                                        className={classes.form}
                                        noValidate
                                        onSubmit={e => {
                                            const { email, password, remember } = form;
                                            loginApi(
                                                { email: email.value, password: password.value, remember: remember.value || undefined },
                                                requestState,
                                                e
                                            );
                                        }}
                                    >
                                        {EmailField}
                                        {PasswordField}
                                        <FormControlLabel
                                            value={form.remember.value}
                                            control={<Checkbox value='remember' color='primary' />}
                                            label={i18n['Remember Me']}
                                            onChange={onChange('remember', [form, setState], true)}
                                        />
                                        <SubmitButton text={i18n['Login']} />
                                    </form>
                                    <Grid container>
                                        <Grid item xs>
                                            <Box textAlign='right'>
                                                <Link
                                                    onClick={restrictLinkFollow(isRequestSent)}
                                                    to={RESET_PWD_ROUTE}
                                                    component={RouterLink}
                                                    variant='body2'
                                                >
                                                    {i18n['Forgot Your Password?']}
                                                </Link>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                        />
                        <Route
                            path={`${RESET_PWD_ROUTE}/:password_reset?`}
                            render={({ match: { params: { password_reset } }, history }) => (
                                password_reset ?
                                    <>
                                        <Avatar className={classes.avatar}>
                                            <VpnKey />
                                        </Avatar>
                                        <Typography component='h1' variant='h5'>
                                            {i18n['Reset Password']}
                                        </Typography>
                                        <form
                                            className={classes.form}
                                            noValidate
                                            onSubmit={e => {
                                                const { email, password, password_confirmation } = form;
                                                resetPasswordApi(
                                                    {
                                                        email: email.value,
                                                        password: password.value,
                                                        password_confirmation: password_confirmation.value,
                                                        token: window.location.pathname.split('/').slice(-1)[0]
                                                    },
                                                    requestState,
                                                    e);
                                            }}
                                        >
                                            {EmailField}
                                            {PasswordField}
                                            {ConfirmPasswordField}
                                            <SubmitButton text={i18n['Reset Password']} />
                                        </form>
                                    </> :
                                    <>
                                        <Avatar className={classes.avatar}>
                                            <Build />
                                        </Avatar>
                                        <Typography component='h1' variant='h5'>
                                            {i18n['Reset Password']}
                                        </Typography>
                                        <form
                                            className={classes.form}
                                            noValidate
                                            onSubmit={e => {
                                                const { email } = form;
                                                sendPasswordResetApi(
                                                    { email: email.value },
                                                    requestState,
                                                    e)
                                                    .then(successfulResponse => {
                                                        if (successfulResponse) {
                                                            setState(prev => ({
                                                                ...prev, email: {
                                                                    ...email,
                                                                    isInvalid: false,
                                                                    validationMessage: '',
                                                                    value: ''
                                                                }
                                                            }));
                                                            requestState[1](false);
                                                            history.replace(LOGIN_ROUTE);
                                                        }
                                                    });
                                            }}
                                        >
                                            {EmailField}
                                            <SubmitButton text={i18n['Send Password Reset Link']} />
                                        </form>
                                        <Grid container>
                                            <Grid item xs>
                                                <Box textAlign='right'>
                                                    <Link
                                                        onClick={restrictLinkFollow(isRequestSent)}
                                                        to={LOGIN_ROUTE}
                                                        component={RouterLink}
                                                        variant='body2'
                                                    >
                                                        Login to account
                                                </Link>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </>
                            )}
                        />
                        <Box mt={5}>
                            <Typography variant='body2' color='textSecondary' align='center'>
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