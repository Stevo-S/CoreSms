using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CoreSms.Models
{
    public class InboundMessage
    {
        public long Id { get; set; }
        public string OperatorName { get; set; }

        [StringLength(12)]
        public string Msisdn { get; set; }

        public string Text { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
