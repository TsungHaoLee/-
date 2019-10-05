namespace TH.User
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class UserService
    {
        public bool SaveUser(DB.User user)
        {
            try
            {
                using (var db = new DB.DBEntities())
                {
                    if (user == null)
                    {
                        return false;
                    }
                    if (user.Id == Guid.Empty)
                    {
                        user.Id = Guid.NewGuid();
                        user.CreateBy = user.UserName;
                        user.CreateDate = DateTime.Now;
                        user.ModifiedBy = user.UserName;
                        user.ModifiedDate = DateTime.Now;
                        user.Enable = true;
                    }
                    var oldData = db.User.Where(c => c.Id == user.Id).FirstOrDefault();
                    if (oldData == null)
                    {
                        db.User.Add(user);
                    }
                    else
                    {
                        user.CreateBy = oldData.CreateBy;
                        user.CreateDate = oldData.CreateDate;
                        user.ModifiedBy = oldData.ModifiedBy;
                        user.ModifiedDate = DateTime.Now;
                        user.Enable = oldData.Enable;
                        db.Entry(oldData).CurrentValues.SetValues(user);
                    }
                    db.SaveChanges();
                    return true;
                }
            }
            catch(Exception e)
            {
                return false;
            }
        }
        public List<DB.User> GetUsers()
        {
            using (var db = new DB.DBEntities())
            {
                return db.User.Where(c=>c.Enable).ToList();
            }
        }
        public bool DeleteUser(Guid userId)
        {
            try
            {
                using (var db = new DB.DBEntities())
                {
                    var oldData = db.User.Where(c => c.Id == userId).FirstOrDefault();
                    if (oldData == null)
                    {
                        return false;
                    }
                    var temp = new DB.User()
                    {
                        Address = oldData.Address,
                        CreateBy = oldData.CreateBy,
                        CreateDate = oldData.CreateDate,
                        Enable = oldData.Enable,
                        Id = oldData.Id,
                        ModifiedDate = oldData.ModifiedDate.HasValue ? oldData.ModifiedDate.Value : new DateTime(),
                        ModifiedBy = oldData.ModifiedBy,
                        Password = oldData.Password,
                        Phone = oldData.Phone,
                        UserName = oldData.UserName
                    };
                    temp.Enable = false;
                    db.Entry(oldData).CurrentValues.SetValues(temp);
                    db.SaveChanges();
                    return true;
                }
            }
            catch
            {
                return true;
            }
        }
    }
}
