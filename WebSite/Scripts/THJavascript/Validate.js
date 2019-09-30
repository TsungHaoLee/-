'use strict'

if (typeof jQuery === 'undefined') {
    throw new Error('jquery is required');
}

window.Validate = window.Validate || {
    NumberValidate: function () {
        alert("NumberValidate");
    },
    EMailValidate: function (mail) {
        var regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(mail);
    },
    PasswordValidate: function (password, confirmPassword) {
        var regExp = /^[0-9A-Za-z_.-]+$/;
        return regExp.test(password) && regExp.test(confirmPassword);
    },
    UserNameValidate: function () {

    }
};