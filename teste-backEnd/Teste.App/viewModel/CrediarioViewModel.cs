using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;
using Teste.Domain.Entities;

namespace Teste.App.viewModel
{
    [DataContract]
    public class CrediarioViewModel
    {
        [DataMember(Name = "id")]
        public int? Id { get; set; }

        [IgnoreDataMember]
        public Person Person { get; set; }

        [DataMember(Name = "person_id")]

        public int PersonId { get; set; }

        [DataMember(Name = "user_id")]
        public int UserId { get; set; }

        [IgnoreDataMember]
        public User User { get; set; }


        [DataMember(Name = "enable_crediario")]
        public Boolean EnableCrediario { get; set; }

        [DataMember(Name = "sales")]
        public virtual List<SaleViewModel> Sales { get; set; }
    }
}
