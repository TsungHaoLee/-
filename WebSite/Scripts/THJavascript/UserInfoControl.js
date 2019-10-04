'use strict'

if (typeof jQuery === 'undefined') {
    throw new Error('jquery is required');
}

window.User = window.User || {
    Users : new Array(),
    CreateUser: function () {
        var user = this.GetUserInfoModel();
        if (!this.ValidateUser(user)) {
            return;
        }
        try {
            $.post('/api/User', user, function (result) {
                if (result) {
                    window.location.reload();
                }
            });
        } catch (e) {
            console.log(e);
        }
    },
    ShowUserList: function () {
        this.GetUser(function (data) {
            for (var i = 0; i < data.length; i++) {
                var tempUser = new UserInfo(data[i].UserName, data[i].Password, data[i].Password, data[i].Address, data[i].Id);
                console.log(tempUser);
                window.User.Users.push(tempUser);
            }
            $("#userList").DataTable({
                data: data,
                columnDefs: [{
                    "targets": 0,
                    "data": null,
                    "defaultContent": "<button>Click!</button>"
                }],
                columns: [
                    {
                        data: 'Id', render: function (data, type, row, meta) {
                            return '<button class="btn btn-primary btn-block" onClick="window.User.ShowPopup(' + data + ')">Edit</button>';
                        }
                    },
                    { data: 'UserName', title: 'UserName' },
                    { data: 'Password', title: 'Password' },
                    { data: 'Address', title: 'Address' },
                ],
            });
        })
    },
    UpdateUser: function (user) {
        alert("UpdateUser");
    },
    GetUser: function (callback) {
        try {
            $.get('/api/User', function (data) {
                callback(data);
            });
        } catch (e) {
            console.error(e);
        }
    },
    DeletedUser: function (userId) {
        alert("DeletedUser");
    },
    GetUserInfoModel: function () {
        var userName = $('input[type="email"].userName').val();
        var passwords = $('input[type="password"].password');
        if (passwords.length != 2) {
            return;
        }
        var password = passwords[0].value;
        var confirmPassword = passwords[1].value;
        var address = $('textarea.address').val();
        var user = new UserInfo(userName, password, confirmPassword, address);
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

