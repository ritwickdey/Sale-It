using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SaleIt.Migrations
{
    public partial class SeedingFeatureTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Features (Name) Values ('Feature1') ");
            migrationBuilder.Sql("INSERT INTO Features (Name) Values ('Feature2') ");
            migrationBuilder.Sql("INSERT INTO Features (Name) Values ('Feature3') ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Features WHERE Name IN ('Feature1','Feature2','Feature3') ");
        }
    }
}
