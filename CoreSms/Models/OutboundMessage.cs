using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreSms.Models
{
    public class OutboundMessage
    {
        public long Id { get; set; }
        public string BulkId { get; set; }
        public string Sender { get; set; }
        public string Destination { get; set; }
        public string Content { get; set; }
        public DateTime? SentAt { get; set; }
        public DateTime? DoneAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
