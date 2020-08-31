using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CoreSms.Models
{
    public class SafaricomInboundMessage
    {
        public long Id { get; set; }
        public string RequestId { get; set; }
        public string ResponseId { get; set; }
        public string ResponseTimeStamp { get; set; }
        public string Channel { get; set; }
        public string Operation { get; set; }
        public string LinkId { get; set; }

        [StringLength(12)]
        public string Msisdn { get; set; }


        public string OfferCode { get; set; }
        public string Content { get; set; }
        public string CpId { get; set; }
        public string Status { get; set; }
        public string StatusCode { get; set; }
        public string Description { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
