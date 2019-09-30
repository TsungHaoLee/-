'use strict'

if (typeof jQuery === 'undefined') {
    throw new Error('jquery is required');
}

window.User = window.User || {
    CreateUser: function () {
        var user = this.GetUserInfoModel();
        if (!this.ValidateUser(user)) {
            return;
        }
    },
    UpdateUser: function (user) {
        alert("UpdateUser");
    },
    GetUser: function () {
        var users = [];
        users.push(new UserInfo('1@gmail.com', '1', '1'));
        users.push(new UserInfo('2@gmail.com', '1', '1'));
        users.push(new UserInfo('3@gmail.com', '1', '1'));
        users.push(new UserInfo('4@gmail.com', '1', '1'));
        users.push(new UserInfo('5@gmail.com', '1', '1'));
        return users;
    },
    DeletedUser: function (userId) {
        alert("DeletedUser");
    },
    GetUserInfoModel: function () {
        var userName = $('input[type="text"].userName').val();
        var passwords = $('input[type="password"].password');
        if (passwords.length != 2) {
            return;
        }
        var password = passwords[0].value;
        var confirmPassword = passwords[1].value;
        var user = new UserInfo(userName, password, confirmPassword);
        return user;
    },
    ValidateUser: function (user) {
        var isValidate = false;
        isValidate = Validate.EMailValidate(user.UserName);
        if (isValidate) {
            console.log('user mail is validate');
        }
        else {
            alert("User Name Validate Error");
            return false;
        }
        if (user.Password != user.ConfirmPassword) {
            alert('Password and confirm password not match')
            return false;
        }
        isValidate = Validate.PasswordValidate(user.Password, user.ConfirmPassword);
        if (isValidate) {
            console.log('password is validate');
        }
        else {
            alert('Password Validate Error');
            return false;
        }
        return true;
    }

};

