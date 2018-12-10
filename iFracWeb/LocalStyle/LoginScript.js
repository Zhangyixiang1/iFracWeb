(function ($) {
    $.login = {

        formMessage: function (msg) {
            $('.login_tips').find('.tips_msg').remove();
            $('.login_tips').append('<div class="tips_msg"><i class=fa fa-question-circle></i>' + msg + '</div>');
        },

        loginClick: function () {
            var $username = $("#username");
            var $password = $("#password");
            var $code = $("#validateCode");
            if ($username.val() == "") {
                $username.focus();
                $.login.formMessage('�������û���');

                return false;
            }
            else if ($password.val() == "") {
                $password.focus();
                $.login.formMessage('�������¼����');

                return false;
            }
            else if ($code.val() == "") {
                $code.focus();
                $.login.formMessage('��������֤��');

                return false;
            }
            else {

                $.login.formMessage('');
                $("#loginButton").attr('disabled', 'disabled').find('span').html("��֤��...");
                $.ajax({
                    url: "/Login/CheckLogin",
                    data: { username: $.trim($username.val()), password: $.trim($password.val()), code: $.trim($code.val()) },
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        if (data.state == "success") {
                            $("#loginButton").find('span').html("��¼�ɹ���������ת...");
                            window.setTimeout(function () {
                                window.location.href = "/Home/Index";
                            }, 500);
                        }
                        else {
                            $("#loginButton").removeAttr('disabled').find('span').html("��¼");
                            $("#switchCode").trigger("click");
                            $code.val('');
                            $.login.formMessage(data.message);
                        }
                    }
                });
            }
        },

        init: function () {
            $("#switchCode").click(function () {
                $("#imgCode").attr("src", "/Login/GetAuthCode?time=" + Math.random());
            });
            $("#loginButton").click(function () {
                $.login.loginClick();
            });
        }

    };
    $(function () {
        $.login.init();
    });
})(jQuery);