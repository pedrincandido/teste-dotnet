using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Teste.Domain.Entities;

namespace Teste.Impl.Context
{
    public class DbInitializer : IDbInitializer
    {
        private DataContext _dataContext;
        public DbInitializer(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Initialize()
        {
            if (!_dataContext.Database.EnsureCreated())
            {
                _dataContext.Database.Migrate();
            }

            if (!_dataContext.Set<User>().Any())
            {
                User user = new User
                {
                    Login = "admin",
                    Password = "1234"
                };

                _dataContext.Add(user);
                _dataContext.SaveChanges(true);
            }

            if (!_dataContext.Set<Gender>().Any())
            {
                Gender m = new Gender
                {
                    Name = "Masculino"
                };

                Gender f = new Gender
                {
                    Name = "Feminino"
                };

                _dataContext.Add(f);
                _dataContext.Add(m);
                _dataContext.SaveChanges(true);
            }
        }
    }
}
