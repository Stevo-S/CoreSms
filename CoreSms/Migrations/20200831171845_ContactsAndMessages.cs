using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace CoreSms.Migrations
{
    public partial class ContactsAndMessages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(nullable: true),
                    MiddleName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Subscribed = table.Column<bool>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InboundMessages",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OperatorName = table.Column<string>(nullable: true),
                    Msisdn = table.Column<string>(maxLength: 12, nullable: true),
                    Text = table.Column<string>(nullable: true),
                    Timestamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InboundMessages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "JasminMoMessages",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    To = table.Column<string>(nullable: true),
                    From = table.Column<string>(nullable: true),
                    OriginConnector = table.Column<string>(nullable: true),
                    Binary = table.Column<string>(nullable: true),
                    Coding = table.Column<short>(nullable: false),
                    Content = table.Column<string>(nullable: true),
                    ExternalId = table.Column<string>(nullable: true),
                    Priority = table.Column<short>(nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JasminMoMessages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SafaricomInboundMessages",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RequestId = table.Column<string>(nullable: true),
                    ResponseId = table.Column<string>(nullable: true),
                    ResponseTimeStamp = table.Column<string>(nullable: true),
                    Channel = table.Column<string>(nullable: true),
                    Operation = table.Column<string>(nullable: true),
                    LinkId = table.Column<string>(nullable: true),
                    Msisdn = table.Column<string>(maxLength: 12, nullable: true),
                    OfferCode = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    CpId = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    StatusCode = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Timestamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SafaricomInboundMessages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContactGroup",
                columns: table => new
                {
                    ContactId = table.Column<long>(nullable: false),
                    GroupId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactGroup", x => new { x.ContactId, x.GroupId });
                    table.ForeignKey(
                        name: "FK_ContactGroup_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContactGroup_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContactGroup_GroupId",
                table: "ContactGroup",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_InboundMessages_Msisdn",
                table: "InboundMessages",
                column: "Msisdn");

            migrationBuilder.CreateIndex(
                name: "IX_InboundMessages_Timestamp",
                table: "InboundMessages",
                column: "Timestamp");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactGroup");

            migrationBuilder.DropTable(
                name: "InboundMessages");

            migrationBuilder.DropTable(
                name: "JasminMoMessages");

            migrationBuilder.DropTable(
                name: "SafaricomInboundMessages");

            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.DropTable(
                name: "Groups");
        }
    }
}
