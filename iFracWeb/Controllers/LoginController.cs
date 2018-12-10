using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iFracWeb.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// d登陆方法验证
        /// </summary>
        /// <returns>OK 或者error</returns>
        public string confirmation()
        {
            //获取前台传回的数据
            string userid = Request["userid"];
            string password = Request["password"];

            //如果验证通过，则把数据存到session中，返回成功
            if (userid == "admin" && password == "admin")
            {
                Session["userID"] = userid;

                return "OK";
            }
            //验证不通过，返回失败
            else
            {

                return "error";
            }



        }
    }
}