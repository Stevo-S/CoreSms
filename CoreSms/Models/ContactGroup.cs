using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreSms.Models
{
    public class ContactGroup
    {
        public long ContactId { get; set; }
        public Contact Contact { get; set; }

        public long GroupId { get; set; }
        public Group Group { get; set; }
    }
}
