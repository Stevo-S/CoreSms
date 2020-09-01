using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreSms.Models
{
    public class JasminMoMessage
    {
        public long Id { get; set; }
        public string To { get; set; }
        public string From { get; set; }

        [FromForm(Name = "origin-connector")]
        public string OriginConnector { get; set; }

        public string Binary { get; set; }
        public short Coding { get; set; }
        public string Content { get; set; }

        [FromForm(Name = "Id")]
        public string ExternalId { get; set; }

        public short Priority { get; set; }

        public DateTime Timestamp { get; set; }
    }
}
