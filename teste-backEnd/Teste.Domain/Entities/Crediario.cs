using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Teste.Domain.Entities
{
    [DataContract]
    public class Crediario : BaseEntity
    {
        public Crediario()
        {
            this.Sales = new List<Sale>();
        }

        [DataMember(Name = "person")]
        public Person Person { get; set; }

        [DataMember(Name = "person_id")]

        public int PersonId { get; set; }

        [DataMember(Name = "user_id")]
        public int UserId { get; set; }

        [DataMember(Name = "user")]
        public User User { get; set; }

        [DataMember(Name = "enable_crediario")]
        public Boolean EnableCrediario { get; set; }

        [DataMember(Name = "sales")]
        public virtual IList<Sale> Sales { get; set; }
    }
}
