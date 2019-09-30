using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TH.User;

namespace WebSite.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CreateUser()
        {
            ViewBag.Message = "Create User.";

            return View();
        }

        public ActionResult UserList()
        {
            ViewBag.Message = "User List.";
            var users = new UserService();
            return View(users);
        }
    }
}