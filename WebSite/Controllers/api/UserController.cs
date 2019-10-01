namespace WebSite.Controllers.api
{
    using System.Collections.Generic;
    using System.Web.Http;
    using TH.DB;
    using TH.User;

    public class UserController : ApiController
    {
        [HttpGet]
        public List<User> Get()
        {
            return new UserService().GetUsers();
        }
        [HttpPost]
        public bool CreateUser(User user)
        {
            return new UserService().SaveUser(user);
        }
    }
}
