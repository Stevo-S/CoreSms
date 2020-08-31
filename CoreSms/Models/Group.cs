using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreSms.Models
{
    public class Group
    {
        public long Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public List<ContactGroup> ContactGroups { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
