using CoreSms.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreSms.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ContactGroup>()
                .HasKey(e => new { e.ContactId, e.GroupId });

            builder.Entity<ContactGroup>()
                .HasOne(cg => cg.Contact)
                .WithMany(cg => cg.ContactGroups)
                .HasForeignKey(cg => cg.ContactId);

            builder.Entity<ContactGroup>()
                .HasOne(cg => cg.Group)
                .WithMany(cg => cg.ContactGroups)
                .HasForeignKey(cg => cg.GroupId);

            builder.Entity<InboundMessage>()
                .HasIndex(im => im.Msisdn);

            builder.Entity<InboundMessage>()
                .HasIndex(im => im.Timestamp);
        }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<InboundMessage> InboundMessages { get; set; }
        public DbSet<SafaricomInboundMessage> SafaricomInboundMessages { get; set; }
        public DbSet<JasminMoMessage> JasminMoMessages { get; set; }
    }
}
