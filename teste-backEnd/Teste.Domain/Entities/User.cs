using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Teste.Domain.Entities
{
    [DataContract]
    public class User : BaseEntity
    {
        
        [DataMember(Name = "login")]
        public string Login { get; set; }

        [DataMember(Name = "password")]
        public string Password { get; set; }
    }
}
