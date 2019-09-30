'use strict'

if (typeof jQuery === 'undefined') {
    throw new Error('jquery is required');
}

window.Layout = window.Layout || {
    GetUserSection: function () {
        var users = User.GetUser();
        var array = users.map(a => a.value);
        $("#userList").DataTable({
            data: users,
            columns: [
                { data: 'UserName', title: 'UserName' },
                { data: 'Password', title: 'Password' },
                { data: 'ConfirmPassword', title: 'ConfirmPassword' }
            ],
        });
    },
}